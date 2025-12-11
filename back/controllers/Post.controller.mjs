import { Post } from "../models/Post.model.mjs";


const sendErrors = (res, errors, status = 400) => {
    return res.status(status).json({ errors });
};

function catchError(res, err) {
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return sendErrors(res, errors, 400);
  }
  return sendErrors(res, [{ field: "global", message: err.message }], 500);
}

// Equivalent du feed
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    return catchError(res, err);
  }
}

export async function getPostbyId(req, res) {
  try {
    const id = Number(req.params.id);
    const post = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({
        error: "Pas de post",
        message: "Le post recherché n'existe pas.",
      });
    } else {
      res.json(post);
    }
  } catch (err) {
    return catchError(res, err);
  }
}

export function createPost(req, res) {
  try {
    const { title, content } = req.body;
    // TODO : Récupérer l'utilisateur connecté
    const user_id = 1;

    if (!title && !content) {
      res.status(404).json({
        error: "Données invalides",
        message: "Le titre ou contenu du post est invalide.",
      });
    } else {
      const post = Post.create({
        title,
        content,
        user_id
      });
      res.status(201).json(post);
    }
  } catch (err) {
    return catchError(res, err);
  }
}

export async function deletePost(req, res) {
  try {
    const id = Number(req.params.id);
    const post = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({
        error: "Pas de post",
        message: "Le post recherché n'existe pas.",
      });
    } else {
      await post.destroy();
      res.status(204).send();
    }
  } catch (err) {
    return catchError(res, err);
  }
}
