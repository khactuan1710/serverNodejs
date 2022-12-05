const express = require("express");
const router = express.Router();
const BookController = require("../controller/book.controller");
const auth = require("../middleware/auth")

router.get("/book", BookController.index);
router.post("/addBook", BookController.addBook);
router.post("/addImageToBook", BookController.addImageToBook);
router.post("/getDetailBook", BookController.getDetailBook);


router.get("/updateBook", BookController.updateBook);
router.get("/deleteBook", BookController.deleteBook);
router.get("/getAllBook", BookController.getAllBook);
router.post("/uploadBook", BookController.uploadBook);
//
router.post("/testpost", auth, BookController.testPost)
module.exports = router;
