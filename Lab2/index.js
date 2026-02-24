import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// create sever --> http --> createServer
// create server using express 
const app = express();
app.use(express.json());

let comments = [
    {id: 1, author: "mohamed", body: "good job"},
    {id: 2, author: "ahmed", body: "bad job"},
    {id: 3, author: "sara", body: "excellent job"},
]

app.get("/home", (req,res) => {
    // path file --> index.js 
    const filePath = fileURLToPath(import.meta.url); // os  /   or  \ 
    //console.log(filePath);
    const dirPath = path.dirname(filePath)
    //console.log(dirPath);
    // res.sendFile(dirPath +"/home.html") // error in path 
    res.sendFile(path.join(dirPath, "index.html"))
})

app.get("/comments", (req,res) => {
    res.json(comments);
})

app.get("/comments/:id", (req,res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id == id);
    if(comment){
        res.json(comment);
    }else{
        res.status(404).json("comment not found");
    }
})

app.post("/comments", (req,res) => {
    const id = comments[comments.length - 1].id + 1;
    const comment = req.body;
    comment.id = id;
    if(!validateComment(comment)){
        res.status(400).json("invalid comment data");
        return;
    }
    comments.push(comment);
    res.status(201).send(comment, "comment added");
})

app.put("/comments/:id", (req,res) => {
    const id = req.params.id;
    const comment = req.body;
    if(!validateComment(comment)){
        res.status(400).json("invalid comment data");
        return;
    }
    const foundedComment = comments.find(c => c.id == id);
    if(foundedComment){
        foundedComment.author = comment.author;
        foundedComment.body = comment.body;
        res.status(200).json(foundedComment, "comment is updated");
        //res.status(200).send(foundedComment, "comment is updated");

    }else{
        res.status(404).json("comment not found");
    }
})

app.delete("/comments/:id", (req,res) => {
    const id = req.params.id;
    comments = comments.filter(c => c.id != id);
    res.json("comment is deleted");
})

function validateComment(comment){
    if(!comment.author || !comment.body){
        return false;
    }
    else if(typeof comment.author !== 'string' || typeof comment.body !== 'string'){
        return false;
    }
    return true;
}

app.listen(3000, () => {
    console.log('server is running on port 3000');
});