
import Joi from "joi";


const createCommentSchema  =  Joi.object({
    content: Joi.string().min(3).required().messages({
        "string.min": "Content must be at least 3 characters long _ From Posts APP",
        "string.empty": "Content is required _ From Posts APP",
    })
})


export default createCommentSchema 