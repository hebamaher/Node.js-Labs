import userModel from "../../Database/Models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

let listUsers = async (req, res) => {
    let users = await userModel.find();
    res.json({mesaage: "List Of Users", data: users});
}

let signup = async (req, res) => {
    let addUser = await userModel.insertMany(req.body);
    addUser[0].password = undefined;
    res.json({message: "User Added", data: addUser});
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

export {listUsers, signup, signin}