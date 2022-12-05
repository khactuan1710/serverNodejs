const Comment = require("../models/db_config").comment;
const Book = require("../models/db_config").book;
const pagination = require("../helper/paginationHelper");
const response = require("../helper/response");
const {validateAddComment} = require("../helper/validator");

class BookController {
    index(req, res) {
        res.send("index comment");
    }

    async addComment(req, res, next) {
        try {
            await validateAddComment.validate(req.body);
            const book = await Book.findOne({
                where: {
                    id: req.body.idManga
                },
            })
            if (!book) {
                return response.ErrorResponse(res, "ID book k hợp lệ!")
            }

            const result = await Comment.create({
                idManga: req.body.idManga,
                idUser: req.body.idUser,
                content: req.body.content,
            });
            if (!result) {
                return response.ErrorResponse(res, "Something went wrong save book!")
            }
            response.successResponseWithData(res, "success", result)
        } catch (error) {
            console.log(error);
            return res.send(`Some thing went wrong ${error}`);
        }
    }


    async getCommentById(req, res) {
        try {
            const idBook = req.body.idManga
            if (!idBook) {
                return response.ErrorResponse(res, "Thieu id truyen")
            }
            const arrComment = await Comment.findAll({
                where: {
                    idManga: idBook
                }
            })
            if (!arrComment) {
                return response.ErrorResponse(res, "Something went wrong get comment")
            }
            response.successResponseWithData(res, "success", arrComment)

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new BookController();
