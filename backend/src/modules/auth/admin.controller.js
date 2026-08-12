import { User } from "../users/user.model.js";
import { Post } from "../posts/post.model.js";
import { Comment } from "../comments/comment.model.js";

export async function getDashboardStats(req, res) {
  try {
    const users = await User.countDocuments();
    const posts = await Post.countDocuments();
    const comments = await Comment.countDocuments();

    // Count draft blogs
    const draftPosts = await Post.countDocuments({
      status: "draft",
    });

    res.json({
      users,
      posts,
      comments,
      draftPosts,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}