import { Router } from "express";
//import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";

import {
  getAllPosts,
  getPostbyId,
  createPost,
  deletePost,
} from "../controllers/Post.controller.mjs";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostbyId);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
