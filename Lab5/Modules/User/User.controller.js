import userModel from "../../Database/Models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendEmail } from "../../Email/email.js";

let listUsers = async (req, res) => {
    let users = await userModel.find();
    res.json({mesaage: "List Of Users", data: users});
}

let signup = async (req, res) => {
    let addUser = await userModel.insertMany(req.body);
    sendEmail(req.body.email)
    addUser[0].password = undefined;
    res.json({message: "User Added", data: addUser});
}

let verifyAccount = (req,res) => {
        // res.send("Verify Account")
    let verifyEmail = req.params.email // coded
    jwt.verify(verifyEmail, "emailToken", async(err, decoded) => {
        if(err){
            return res.status(401).json({message: "Invalid Token"})
        }
        // user --> isConfirmed = true
        console.log(decoded);
        await userModel.findOneAndUpdate({email: decoded}, {isConfirmed: true})
        res.status(200).json({message: "Account Verified"})
    })
}

let signin = async (req, res) => {
    let foundUser = req.foundUser;
    let matchPassword = bcrypt.compareSync(req.body.password, foundUser.password);
    if(matchPassword){
        let token = jwt.sign({_id: foundUser._id, name: foundUser.name, email: foundUser.email}, "iti"); // create token
        return res.json({message: "Welcome", data: foundUser, token: token});
    }
    res.status(422).json({message: "Invalid Password or Email"});
}

export {listUsers, signup, signin, verifyAccount}