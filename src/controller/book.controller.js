const Book = require("../models/db_config").book;
const ImageManga = require("../models/db_config").image;
const multer = require("multer");
const upload = require("../middleware/fileUpload");
const uploadMulti = require("../middleware/multipleUploadImage");
const cloudinary = require("../middleware/cloudinarySetUp");
const pagination = require("../helper/paginationHelper");
const response = require("../helper/response");
const {validateAddBook, validateAddImageToBook} = require("../helper/validator");

class BookController {
    index(req, res) {
        res.send("index book");
    }

    async addBook(req, res, next) {
        try {

            await validateAddBook.validate(req.body);

            const result = await Book.create({
                name: req.body.name,
                description: req.body.description,
                author: req.body.author,
                publishingYear: req.body.publishingYear,
                coverImage: req.body.coverImage,
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

    updateBook(req, res, next) {
        res.send("updateBook!");
    }

    async deleteBook(req, res, next) {
        try {
            const del = await Book.destroy({
                where: {
                    id: 2,
                },
            });

            if (del === 0) {
                res.send("ok");
            } else {
                res.send("not ok");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAllBook(req, res) {
        const {page, size} = req.query;

        if (page <= 0) {
            return response.ErrorResponse(res, "Num page start from 1");
        }
        const {limit, offset} = pagination.getPagination(page, size);

        try {
            const data = await Book.findAll({
                limit,
                offset,
            });
            const countItem = await Book.findAndCountAll();
            if (data && countItem) {
                response.successResponsePaginationWithData(
                    res,
                    "Success",
                    page,
                    Math.ceil(countItem.count / size),
                    data
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getDetailBook(req, res, next) {
        try {
            const idManga = req.body.idManga
            if (!idManga) {
                return response.ErrorResponse(res, "Thieu id manga")
            }
            const book = await Book.findOne({
                where: {
                    id: idManga
                }
            })
            if (!book) {
                return response.ErrorResponse(res, "ID book k hop le")
            }
            const img = await ImageManga.findAll({
                where: {
                    idManga: idManga
                }
            })
            if (!img) {
                return response.ErrorResponse(res, "Loi k tim thay img cua truyen")
            }

            const dataResponse = {
                info: book,
                img: img
            }

            response.successResponseWithData(res, "Success", dataResponse)
        } catch (e) {
            console.log(e)
            return response.ErrorResponse(res, "Err " + e.message())
        }
    }

    async addImageToBook(req, res, next) {
        try {

            const data = req.body.data

            if (!data) {
                return response.ErrorResponse(res, "Trong value")
            }
            let resultImg = []
            for (let i = 0; i < data.length; i++) {
                await validateAddImageToBook.validate(req.body.data[i])

                const result = await ImageManga.create({
                    idManga: data[i].idManga,
                    chapter: data[i].chapter,
                    page: data[i].page,
                    img: data[i].img,
                })
                if (result) {
                    resultImg.push(result)
                }

            }

            if (resultImg.length !== data.length) {
                return response.ErrorResponse(res, "Err khi add ")
            }
            //
            response.successResponseWithData(res, "success", resultImg)
            // console.log(req.body)

        } catch (e) {
            console.log(e)
            return response.ErrorResponse(res, "Err " + e.message())
        }
    }

    async uploadBook(req, res, next) {
        try {
            upload(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    res.send(err);
                    return;
                } else if (err) {
                    res.send(err);
                    return;
                }
                const result = await cloudinary.uploader.upload(req.file.path);
                if (!result) {
                    return response.ErrorResponse(
                        res,
                        "Something went wrong! (up load file to cloudinary!)"
                    );
                }
                res.send({url: result.url});
            });
        } catch (error) {
            console.log(error);
        }
    }


    async testPost(req, res) {
        try {
            if (!req) return res.status(401).send("null params");
            console.log(req.body);
            response.successResponseWithData(res, "message", req.body);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new BookController();
