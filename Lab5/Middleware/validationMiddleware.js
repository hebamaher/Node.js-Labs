import { Schema } from "mongoose";
import {signupSchema, signinSchema} from "../Validation/userValidation.js"
import Joi from "joi"

export const validationMiddleware = (schema) => {
    return (req,res,next) => {
        const validation = schema.validate(req.body);
        if(validation.error){
            return res.status(422).json({message: validation.error.details[0].message})
        }
        next();
    }

}