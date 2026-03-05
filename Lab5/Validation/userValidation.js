
import Joi from "joi";


const signupSchema =  Joi.object({
    name: Joi.string().min(3).max(10).required().messages({
        "string.min": "Name must be at least 3 characters long _ From Posts APP",
        "string.empty": "Name is required _ From Posts APP",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid Email _ From Posts APP",
    }),
    password: Joi.string().min(6).max(10).required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$')).messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number _ From Posts APP",
    })
})

const signinSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
})

export {signupSchema, signinSchema} 