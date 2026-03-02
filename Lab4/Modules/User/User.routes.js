import express from "express";
import { listUsers, signup, signin } from "./User.controller.js";
import checkEmail from "../../Middleware/checkEmail.js";
import hashPassword from "../../Middleware/hashPassword.js";

let userRoutes = express.Router();

// userRoutes.get("/users", listUsers);
userRoutes.get("/users", listUsers);
userRoutes.post("/signup",checkEmail,hashPassword, signup);
userRoutes.post("/signin",checkEmail, signin);

export default userRoutes