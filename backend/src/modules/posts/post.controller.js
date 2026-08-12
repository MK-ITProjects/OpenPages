import * as postService from './post.service.js';
import * as userService from '../users/user.service.js';

export async function index(req, res, next) {
  try {
    const result = await postService.listPosts(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function feed(req, res, next) {
  try {
    const result = await postService.listFeedForUser(req.userId, req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function drafts(req, res, next) {
  try {
    const posts = await postService.listDraftsForUser(req.userId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function top(req, res, next) {
  try {
    const posts = await postService.listTopPosts(req.query.limit);
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function popularTags(req, res, next) {
  try {
    const tags = await postService.listPopularTags(req.query.limit);
    res.json(tags);
  } catch (err) {
    next(err);
  }
}

export async function search(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Query param "q" is required' });
    }
    const [postResults, users] = await Promise.all([
      postService.searchPosts(q, req.query),
      userService.searchUsersByName(q),
    ]);
    res.json({ ...postResults, users });
  } catch (err) {
    next(err);
  }
}

export async function showBySlug(req, res, next) {
  try {
    const post = await postService.getPostBySlug(req.params.slug);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const post = await postService.createPost(req.userId, req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const post = await postService.updatePost(req.params.id, req.userId, req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function destroy(req, res, next) {
  try {
    await postService.deletePost(req.params.id, req.userId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function clap(req, res, next) {
  try {
    const post = await postService.toggleClap(req.params.slug, req.userId);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function bookmark(req, res, next) {
  try {
    const post = await postService.getPostBySlug(req.params.slug);
    const result = await userService.toggleBookmark(req.userId, post._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function userStats(req, res, next) {
  try {
    const stats = await postService.getUserStats(req.userId);
    res.json(stats);
  } catch (err) {
    next(err);
  }
}

