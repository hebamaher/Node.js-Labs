
import jwt from "jsonwebtoken"


let verifyToken = (req,res,next) => {
    console.log(req.headers);
     let token = req.headers.token
      jwt.verify(token, "iti", async(err, decoded) => {
           if(err){
               return res.status(401).json({message: "Invalid Token"})
           }else{
                req.decoded = decoded
               next();
           }
       })
}

export default verifyToken