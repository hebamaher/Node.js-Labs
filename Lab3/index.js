import express from "express";
import { connection } from "./Database/dbConnect.js";
import postRoutes from "./Modules/Post/Post.routes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json())
connection;
app.use(postRoutes) // call routes

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// --v :  represents the version key automatically added by Mongoose, It helps prevent conflicts if multiple users/processes update the same document simultaneously