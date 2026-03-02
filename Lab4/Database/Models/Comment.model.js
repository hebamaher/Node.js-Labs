import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        content: {
                type: String,
                required: [true, "Content is required"]
        },

        user:{
            type: mongoose.Types.ObjectId,
            ref: "User" // reference to User Model == users collection
        },
        post:{
            type: mongoose.Types.ObjectId,
            ref: "Post" // reference to Post Model == posts collection
        }
    },
    {
        versionKey: false 
    }
)

export const commentModel = mongoose.model("Comment", commentSchema)