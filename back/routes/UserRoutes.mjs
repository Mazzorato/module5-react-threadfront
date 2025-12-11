import { Router } from "express";

import { register, login, logout } from "../controllers/UserControllers.mjs";

const router= Router();

// user/register
userController.post("/:register",register);
// /user/login
userController.post("/:login", login);
// user/Logout
userController.get("/:logout", logout);

export default router;
