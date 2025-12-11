import { Router } from "express";

import { createComment, deleteComment } from "../controllers/CommentControllers.mjs";

const router = Router();

router.post("/:postId", createComment);
router.delete("/:id", deleteComment);

export default router;

