import express from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "./Post.controller.js";
import verifyToken from "../../Middleware/verifyToken.js";

const postRoutes = express.Router();
postRoutes.use(verifyToken);
// app --> server 
postRoutes.get("/", getPosts)
postRoutes.get("/:id", getPost)
postRoutes.post("/", createPost)
postRoutes.put("/:id", updatePost)
postRoutes.delete("/:id", deletePost)

export default postRoutes