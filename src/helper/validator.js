const Joi = require("joi")

const validateLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(3).max(10).required()
})
const validateRegister = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(3).max(10).required(),
    fullName: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(5).required()
})

const validateAddBook = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(10).required(),
    author: Joi.string().min(3).max(20).required(),
    publishingYear: Joi.string().min(4).max(4).required(),
    coverImage: Joi.string().min(4).required(),
})
const validateAddComment = Joi.object({
    idManga: Joi.string().min(1).required(),
    idUser: Joi.string().min(1).required(),
    content: Joi.string().min(5).required(),
})
const validateAddImageToBook = Joi.object({
    idManga: Joi.string().min(1).required(),
    chapter: Joi.string().min(1).required(),
    page: Joi.string().min(1).required(),
    img: Joi.string().min(1).required(),
})

// const validateReq = Joi.object({
//     username: Joi.string().required(),
//     password: Joi.string().min(3).max(10).required()
// })


module.exports = {validateLogin, validateRegister, validateAddBook, validateAddComment, validateAddImageToBook}