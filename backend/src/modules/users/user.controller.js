import * as userService from './user.service.js';

export async function suggestions(req, res, next) {
  try {
    const users = await userService.suggestUsersToFollow({
      excludeId: req.query.exclude,
      limit: req.query.limit,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function show(req, res, next) {
  try {
    const user = await userService.getPublicProfile(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function follow(req, res, next) {
  try {
    const result = await userService.toggleFollow(req.userId, req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function following(req, res, next) {
  try {
    const users = await userService.listFollowing(req.params.id);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function followers(req, res, next) {
  try {
    const users = await userService.listFollowers(req.params.id);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function bookmarks(req, res, next) {
  try {
    const posts = await userService.listBookmarks(req.userId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
}
