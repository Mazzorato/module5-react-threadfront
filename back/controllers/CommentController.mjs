import { Comment } from "../models/CommentModel.mjs";


export async function createComment(req, res) {
  try {
    const { content } = req.body;
    const post_id = Number(req.params.postId);

    const user_id = req.user.id;

    const newComment = await Comment.create({
      content,
      user_id,
      post_id,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
}

export async function getComments(req, res) {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
}

export async function deleteComment(req, res) {
  try {
    const id = Number(req.params.commentId);
    const comment = await Comment.findByPk(id);

    if(!comment) {
      res.status(404).json({ error: "Comment not found" });
    } else {
      if (comment.user_id === req.user.id) {
        await comment.destroy();
      res.status(204).json({ message: "Comment deleted" });
      } else {
        res.status(401).json({ error: "Not authorized" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
}