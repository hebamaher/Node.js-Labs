import express from "express";
import { listUsers, signup, signin, verifyAccount } from "./User.controller.js";
import checkEmail from "../../Middleware/checkEmail.js";
import hashPassword from "../../Middleware/hashPassword.js";
import { validationMiddleware } from "../../Middleware/validationMiddleware.js";
import { signupSchema, signinSchema } from "../../Validation/userValidation.js";


let userRoutes = express.Router();

// userRoutes.get("/users", listUsers);
userRoutes.get("/users", listUsers);
userRoutes.post("/signup", validationMiddleware(signupSchema), checkEmail, hashPassword, signup);
userRoutes.post("/signin", validationMiddleware(signinSchema), checkEmail, signin);
userRoutes.get("/verify/:email", verifyAccount);


export default userRoutes