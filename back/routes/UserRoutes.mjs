import { Router } from "express";
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";
import { register, login, logout } from "../controllers/UserController.mjs";
import { getPostsbyUserId } from "../controllers/PostController.mjs";
import { User } from "../models/UserModel.mjs";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//router.get("/users/:userId/posts", isLoggedInJWT(User), getPostsbyUserId);
router.get("/users/:userId/posts", getPostsbyUserId);

export default router;
