import { postModel } from "../../Database/Models/Post.model.js";
import mongoose from "mongoose";

const getPosts = async (req,res) => {
    // database --> collection posts 
    let posts = await postModel.find()
    res.json({message: "List Of Posts", data: posts})
    // res.send("list of posts")
}

const getPost = async (req,res) => {
    let id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Post ID" });
    }
    let post = await postModel.findById(id)
    res.json({message: "Post Found", data: post})
}

const createPost =  async(req,res) => {
    let newPost = await postModel.insertMany(req.body)
    res.status(201).json({message: "Post Created", data: newPost})
}

const updatePost = async(req, res) => {
    let id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Post ID" });
    }
    let updatePost = await postModel.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({message: "Post Updated", data: updatePost})
}

const deletePost = async (req, res) => {
    let id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Post ID" });
    }
    let deletedPost = await postModel.findByIdAndDelete(id)
    res.status(200).json({message: "Post Deleted", data: deletedPost})
}

export {getPosts, getPost, createPost, updatePost, deletePost}