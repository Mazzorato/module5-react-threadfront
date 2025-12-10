import express from "express";

export async function getCommentsController(app) {
    const commentsController = app.route()
    
    commentsController.post("/")

    commentsController.post("/UserId")

    commentsController.post("/PostId")

    return commentsController;
}