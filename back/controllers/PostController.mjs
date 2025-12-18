import { Post } from "../models/PostModel.mjs";
import { Comment } from "../models/CommentModel.mjs";
import { User } from "../models/UserModel.mjs";

// Equivalent du feed
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]], // Trier par date décroissante
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    }).then((posts) => {
      return posts.map((post) => {
        post.get().isOwner = post.user_id === req.user.id ? true : false;
        return post.get();
      });
    });

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
}

export async function getMyPosts(req, res) {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.user.id },
      order: [["createdAt", "DESC"]], // Trier par date décroissante
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    }).then((posts) => {
      return posts.map((post) => {
        post.get().isOwner = post.user_id === req.user.id ? true : false;
        return post.get();
      });
    });
    
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
}

export async function getPostbyId(req, res) {
  try {
    const id = Number(req.params.postId);
    const post = await Post.findByPk(id, {
      include: [
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
      order: [
        [
          {
            model: Comment,
            as: "comments",
          },
          "createdAt",
          "DESC",
        ],
      ],
    }).then((post) => {
      let p = post.get({ plain: true });
      p.comments = p.comments.map((comment) => {
        return {
          ...comment,
          isOwner: comment.user_id === req.user.id ? true : false,
        };
      });
      return p;
    });

    if (!post) {
      res.status(404).json({
        error: "Pas de post",
        message: "Le post recherché n'existe pas.",
      });
    } else {
      res.json(post);
    }
  } catch (err) {
    console.log(err);
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
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content) {
      res.status(404).json({
        error: "Données invalides",
        message: "Le post est invalide.",
      });
    } else {
      const post = await Post.create({
        content,
        user_id,
      });
      res.status(201).json(post);
    }
  } catch (err) {
    console.log(err);
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
