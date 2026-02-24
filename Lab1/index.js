const http = require('http');
const fs = require('fs');

// posts = [
//     {id: 1, title: "Post 1", content: "This is the first post"},
//     {id: 2, title: "Post 2", content: "This is the second post"},
//     {id: 3, title: "Post 3", content: "This is the third post"},
// ]

const data = fs.readFileSync("./data.json", "utf-8");
posts = JSON.parse(data);


const server = http.createServer((req, res) => {
    console.log(req.method)
    if(req.url === '/'){
        res.end("welcome");
    }
    else if(req.url === '/posts' && req.method === 'GET'){
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(posts)); // convert a JavaScript object or array (posts) into a JSON string
        //res.end(posts);
    }
    else if(req.url === '/posts' && req.method === 'POST'){
        req.on("data", (chunk) => {
            const newPost = JSON.parse(chunk); // convert a JSON string (chunk) into a JavaScript object
            if(posts.find(element => element.id == newPost.id)){
                res.statusCode = 400;
                res.end("Post Already Exists");
                return;
            }
            if(!validatePost(newPost)){
                res.statusCode = 400;
                res.end("Invalid Post Data");
                return;
            }
            posts.push(newPost);
            fs.writeFileSync("./data.json", JSON.stringify(posts, null, 2));
            res.statusCode = 201;
            res.end("Post Created");
        })
    }
    else if(req.url === '/posts' && req.method === 'PUT'){
        req.on("data", (chunk) => {
            const updatePost = JSON.parse(chunk);
            let foundPost = posts.find(element => element.id == updatePost.id);
            if(foundPost){
                foundPost.title = updatePost.title;
                foundPost.content = updatePost.content;
                res.statusCode = 200;
                res.end("Post Updated");
            }else{
                res.statusCode = 404;
                res.end("Post Not Found");
            }
        })
    }
    else if(req.url === '/posts' && req.method === 'DELETE'){
        req.on("data", (chunk) => {
            const deletePost = JSON.parse(chunk);
            posts = posts.filter(element => element.id != deletePost.id);
            res.statusCode = 200;
            res.end("Post Deleted");
        })
    }
    else if(req.url.startsWith('/posts/') && req.method === 'GET'){
        const id = req.url.split("/")[2]; // posts/1 --> ["posts", "1"] --> id = 1
        const foundPost = posts.find(element => element.id == id);
        if(foundPost){
            res.setHeader("content-type", "application/json")
            res.end(JSON.stringify(foundPost));
        }else{
            res.statusCode = 404;
            res.end("Post Not Found");
        }
    }

})

// fs.writeFileSync("data.txt", "Hello World", (err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("File Created");
//     }
// })

function validatePost(post){
    if(!post.id || !post.title || !post.content){
        return false;
    }
    else if(typeof post.id !== 'number' || typeof post.title !== 'string' || typeof post.content !== 'string'){
        return false;
    }
    return true;
}

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})