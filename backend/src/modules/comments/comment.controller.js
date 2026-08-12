import { Comment } from './comment.model.js';

export async function index(req, res, next) {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: -1 })
      .populate('author', 'name avatarUrl');
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const comment = await Comment.create({
      post: req.params.postId,
      author: req.userId,
      text: req.body.text,
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

export async function destroy(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (String(comment.author) !== String(req.userId)) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    await comment.deleteOne();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
