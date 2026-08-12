import { User } from './user.model.js';
import { Post } from '../posts/post.model.js';

export async function getPublicProfile(id) {
  const user = await User.findById(id).select('-passwordHash');
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;
}

export async function toggleFollow(userId, targetId) {
  if (String(userId) === String(targetId)) {
    const err = new Error('Cannot follow yourself');
    err.status = 400;
    throw err;
  }

  const target = await User.findById(targetId);
  if (!target) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const me = await User.findById(userId);
  const isFollowing = me.following.some((id) => String(id) === String(targetId));

  if (isFollowing) {
    me.following = me.following.filter((id) => String(id) !== String(targetId));
  } else {
    me.following.push(targetId);
  }

  await me.save();
  return { following: me.following, isFollowing: !isFollowing };
}

export async function listFollowing(id) {
  const user = await User.findById(id).populate('following', 'name avatarUrl bio');
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user.following;
}

export async function listFollowers(id) {
  return User.find({ following: id }).select('name avatarUrl bio');
}

export async function toggleBookmark(userId, postId) {
  const post = await Post.findById(postId);
  if (!post) {
    const err = new Error('Post not found');
    err.status = 404;
    throw err;
  }

  const me = await User.findById(userId);
  const isBookmarked = me.bookmarks.some((id) => String(id) === String(postId));

  if (isBookmarked) {
    me.bookmarks = me.bookmarks.filter((id) => String(id) !== String(postId));
  } else {
    me.bookmarks.push(postId);
  }

  await me.save();
  return { bookmarks: me.bookmarks, isBookmarked: !isBookmarked };
}

export async function suggestUsersToFollow({ excludeId, limit = 5 }) {
  const filter = {};

  if (excludeId) {
    const me = await User.findById(excludeId).select('following');
    filter._id = { $ne: excludeId, $nin: me?.following || [] };
  }

  return User.find(filter).select('name avatarUrl bio').limit(Number(limit));
}

export async function searchUsersByName(query) {
  return User.find({ name: { $regex: query, $options: 'i' } })
    .select('name avatarUrl bio')
    .limit(10);
}

export async function listBookmarks(userId) {
  const me = await User.findById(userId).populate({
    path: 'bookmarks',
    populate: { path: 'author', select: 'name avatarUrl' },
  });
  return me.bookmarks;
}
