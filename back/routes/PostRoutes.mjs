import { Router } from "express";
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";
import {
  getAllPosts,
  getPostbyId,
  createPost,
  deletePost,
} from "../controllers/PostController.mjs";
import { createComment } from "../controllers/CommentController.mjs";
import { User } from "../models/UserModel.mjs";

const router = Router();

router.get("/", isLoggedInJWT(User), getAllPosts);
router.get("/:postId", isLoggedInJWT(User),getPostbyId);
router.post("/", isLoggedInJWT(User),createPost);
router.delete("/:postId", isLoggedInJWT(User),deletePost);

router.post("/:postId/comments", isLoggedInJWT(User), createComment);

export default router;
