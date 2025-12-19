import { Router } from "express";
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";
import { register, login, logout, me } from "../controllers/UserController.mjs";
import { getPostsbyUserId } from "../controllers/PostController.mjs";
import { User } from "../models/UserModel.mjs";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isLoggedInJWT(User), logout);
router.get("/me", isLoggedInJWT(User), me);
router.get("/users/:userId/posts", isLoggedInJWT(User), getPostsbyUserId);

export default router;
