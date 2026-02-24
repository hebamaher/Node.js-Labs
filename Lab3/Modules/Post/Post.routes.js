import express from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "./Post.controller.js";

const postRoutes = express.Router();
// app --> server 
postRoutes.get("/posts", getPosts)
postRoutes.get("/posts/:id", getPost)
postRoutes.post("/posts", createPost)
postRoutes.put("/posts/:id", updatePost)
postRoutes.delete("/posts/:id", deletePost)

export default postRoutes