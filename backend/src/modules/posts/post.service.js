import { Post } from './post.model.js';
import { User } from '../users/user.model.js';
import { slugify, calculateReadTime } from '../../shared/utils/slugify.js';

async function generateUniqueSlug(title) {
  const base = slugify(title);
  let slug = base;
  let suffix = 1;

  while (await Post.exists({ slug })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function listPosts({ tag, author, page = 1, limit = 10 }) {
  const filter = { status: 'published' };
  if (tag) filter.tags = tag;
  if (author) filter.author = author;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate('author', 'name avatarUrl'),
    Post.countDocuments(filter),
  ]);

  return { posts, total, page: Number(page), pages: Math.ceil(total / limit) };
}

export async function listFeedForUser(userId, { page = 1, limit = 10 }) {
  const me = await User.findById(userId);
  const skip = (page - 1) * limit;
  const filter = { status: 'published', author: { $in: me.following } };

  const [posts, total] = await Promise.all([
    Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate('author', 'name avatarUrl'),
    Post.countDocuments(filter),
  ]);

  return { posts, total, page: Number(page), pages: Math.ceil(total / limit) };
}

export async function listDraftsForUser(userId) {
  return Post.find({ author: userId, status: 'draft' }).sort({ updatedAt: -1 });
}

export async function getPostBySlug(slug) {
  const post = await Post.findOne({ slug }).populate('author', 'name avatarUrl bio');
  if (!post) {
    const err = new Error('Post not found');
    err.status = 404;
    throw err;
  }
  return post;
}

async function getPostForMutation(id, authorId) {
  const post = await Post.findById(id).populate('author', 'name avatarUrl bio');
  if (!post) {
    const err = new Error('Post not found');
    err.status = 404;
    throw err;
  }
  if (String(post.author._id) !== String(authorId)) {
    const err = new Error('Not authorized for this post');
    err.status = 403;
    throw err;
  }
  return post;
}

export async function createPost(authorId, { title, content, tags, coverImage, status }) {
  const slug = await generateUniqueSlug(title);
  return Post.create({
    title,
    slug,
    content,
    tags,
    coverImage,
    status: status === 'published' ? 'published' : 'draft',
    readTimeMinutes: calculateReadTime(content),
    author: authorId,
  });
}

export async function updatePost(id, authorId, updates) {
  const post = await getPostForMutation(id, authorId);

  if (updates.title && updates.title !== post.title) {
    post.slug = await generateUniqueSlug(updates.title);
  }
  if (updates.content) {
    post.readTimeMinutes = calculateReadTime(updates.content);
  }

  Object.assign(post, updates);
  await post.save();
  return post;
}

export async function deletePost(id, authorId) {
  const post = await getPostForMutation(id, authorId);
  await post.deleteOne();
}

export async function toggleClap(slug, userId) {
  const post = await getPostBySlug(slug);
  const alreadyClapped = post.claps.some((clapperId) => String(clapperId) === String(userId));

  if (alreadyClapped) {
    post.claps = post.claps.filter((clapperId) => String(clapperId) !== String(userId));
  } else {
    post.claps.push(userId);
  }

  await post.save();
  return post;
}

export async function listTopPosts(limit = 5) {
  const posts = await Post.aggregate([
    { $match: { status: 'published' } },
    { $addFields: { clapCount: { $size: '$claps' } } },
    { $sort: { clapCount: -1, createdAt: -1 } },
    { $limit: Number(limit) },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
        pipeline: [{ $project: { name: 1, avatarUrl: 1 } }],
      },
    },
    { $unwind: '$author' },
  ]);

  return posts;
}

export async function listPopularTags(limit = 20) {
  return Post.aggregate([
    { $match: { status: 'published' } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: Number(limit) },
    { $project: { _id: 0, tag: '$_id', count: 1 } },
  ]);
}

export async function searchPosts(query, { page = 1, limit = 10 }) {
  const filter = { status: 'published', $text: { $search: query } };
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find(filter, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(Number(limit))
      .populate('author', 'name avatarUrl'),
    Post.countDocuments(filter),
  ]);

  return { posts, total, page: Number(page), pages: Math.ceil(total / limit) };
}
export async function getUserStats(userId) {
  const totalPosts = await Post.countDocuments({
    author: userId,
  });

  const latestPost = await Post.findOne({
    author: userId,
  })
    .sort({ createdAt: -1 })
    .select("title");

  return {
    totalPosts,
    latestPost: latestPost ? latestPost.title : "No blogs yet",
  };
}