import { Post } from "../models/PostModel.mjs";
import { Comment } from "../models/CommentModel.mjs";

// Equivalent du feed
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],  // Trier par date décroissante 
  });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
}

export async function getPostbyId(req, res) {
  try {
    const id = Number(req.params.postId);
    const post = await Post.findByPk(id, { include: ["comments"] });

    if (!post) {
      res.status(404).json({
        error: "Pas de post",
        message: "Le post recherché n'existe pas.",
      });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve post by id" });
  }
}

export async function getPostsbyUserId(req, res) {
  try {
    const user_id = Number(req.params.userId);
    const posts = await Post.findAll({
      where: { user_id },
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve post by id" });
  }
}

export async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const user_id = req.user.id;

    if (!title && !content) {
      res.status(404).json({
        error: "Données invalides",
        message: "Le titre ou contenu du post est invalide.",
      });
    } else {
      const post = await Post.create({
        title,
        content,
        user_id,
      });
      res.status(201).json(post);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to create posts" });
  }
}

export async function deletePost(req, res) {
  try {
    const id = Number(req.params.postId);
    const post = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({
        error: "Pas de post",
        message: "Le post recherché n'existe pas.",
      });
    } else {
      if (post.user_id === req.user.id) {
        await post.destroy();
        res.status(204).send();
      } else {
        res.status(401).json({ error: "Not authorized" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete posts" });
  }
}
