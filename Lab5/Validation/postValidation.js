
import Joi from "joi";


const createPostSchema =  Joi.object({
    title: Joi.string().min(3).max(10).required().messages({
        "string.min": "Title must be at least 3 characters long _ From Posts APP",
        "string.empty": "Title is required _ From Posts APP",
    }),
    content: Joi.string().min(3).required().messages({
        "string.min": "Content must be at least 3 characters long _ From Posts APP",
        "string.empty": "Content is required _ From Posts APP",
    })
})


export default createPostSchema 