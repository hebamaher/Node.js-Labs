import { getComments, myComments, createComment, updateComment, deleteComment } from "./Comment.controller.js";
import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";


const commentRoutes = express.Router();
commentRoutes.use(verifyToken);

commentRoutes.get("/comments", getComments)
commentRoutes.get("/myComments", myComments)
commentRoutes.post("/comments", createComment)
commentRoutes.put("/comments/:id", updateComment)
commentRoutes.delete("/comments/:id", deleteComment)

// commentRoutes.get("/posts/:postId/comments", getComments)
// commentRoutes.get("/posts/:postId/comments", myComments)
// commentRoutes.post("/posts/:postId/comments", createComment)
// commentRoutes.put("/posts/:postId/comments/:id", updateComment)
// commentRoutes.delete("/posts/:postId/comments/:id", deleteComment)


export default commentRoutes