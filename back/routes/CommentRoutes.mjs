import { Router } from "express";
import {
  deleteComment,
} from "../controllers/CommentController.mjs";
import { User } from "../models/UserModel.mjs";
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";

const router = Router();

router.delete("/:commentId", isLoggedInJWT(User), deleteComment);

export default router;
