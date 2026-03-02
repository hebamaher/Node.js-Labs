import {commentModel} from "../../Database/Models/Comment.model.js";
import mongoose from "mongoose";

const getComments = async (req,res) => {
    let comments = await commentModel.find().select(["content", "_id"]).populate("post").populate("user")
    res.json({message: "List Of Comments", data: comments})
}

let myComments = async(req,res) => {
    let decoded = req.decoded
    let myComments = await commentModel.find({user: decoded._id})
    res.json({message: "My Comments", data: myComments});
}

const createComment =  async(req,res) => {
    let decoded = req.decoded
    req.body.user = decoded._id
    let newComment = await commentModel.insertMany(req.body)
    res.status(201).json({message: "Comment Created", data: newComment})
}

const updateComment = async(req, res) => {
    let id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Comment ID" });
    }
    let updateComment = await commentModel.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({message: "Comment Updated", data: updateComment})
}

const deleteComment = async (req, res) => {
    let id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Comment ID" });
    }
    let deletedComment = await commentModel.findByIdAndDelete(id)
    res.status(200).json({message: "Comment Deleted", data: deletedComment})
}

export {getComments, myComments, createComment, updateComment, deleteComment}