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
        }
    },
    {
        timestamps: true  
    }
)

export const postModel = mongoose.model("Post", postSchema)