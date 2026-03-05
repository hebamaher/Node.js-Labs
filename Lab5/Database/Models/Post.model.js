import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [3, "Title must be at least 3 characters"]
        },
        content: {
                type: String,
                required: [true, "Content is required"]
        },

        createdBy:{
            type: mongoose.Types.ObjectId,
            ref: "User" // reference to User Model == users collection
        }
    },
    {
        timestamps: true,
        versionKey: false 
    }
)

export const postModel = mongoose.model("Post", postSchema)