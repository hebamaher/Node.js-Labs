import express from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "./Post.controller.js";
import verifyToken from "../../Middleware/verifyToken.js";
import { validationMiddleware } from "../../Middleware/validationMiddleware.js";
import createPostSchema from "../../Validation/postValidation.js";

const postRoutes = express.Router();
postRoutes.use(verifyToken);
// app --> server 
postRoutes.get("/posts", getPosts)
postRoutes.get("/posts/:id", getPost)
postRoutes.post("/posts", validationMiddleware(createPostSchema),createPost)
postRoutes.put("/posts/:id", updatePost)
postRoutes.delete("/posts/:id", deletePost)

export default postRoutes