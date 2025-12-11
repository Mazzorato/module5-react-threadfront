import { Comment } from "../models/commentModels.mjs";


export async function createComment(req, res) {
  try {
    const CommentModel = await Comment();
    const { content, UserId, PostId } = req.body;

    const newComment = await CommentModel.create({
      content,
      UserId,
      PostId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
}

export async function getComments(req, res) {
  try {
    const CommentModel = await Comment();
    const comments = await CommentModel.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
}

export async function deleteComment(req, res) {
  try {
    const CommentModel = await Comment();
    const { id } = req.params;

    const deleted = await CommentModel.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(200).json({ message: "Comment deleted" });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
}