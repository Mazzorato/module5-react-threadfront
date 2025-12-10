import express from "express";


const app = express();

export function getUserController(app) {
  const userController = app.route();

  // /user/
  userController.post("/");
  // user/register
  userController.post("/register",(req,res)=>{

  });
  // /user/login
  userController.post("/login");
  // users
  userController.get("/users");
  // user/userId
  userController.get("/userID");
  // user/Id/post
  userController.get("/userId/post");
  // user/Logout
  userController.get("/logout");

  return userController;
}