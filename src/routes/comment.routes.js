const express = require("express");
const router = express.Router();
const CommentController = require("../controller/comment.controller");

router.post("/addComment", CommentController.addComment);
router.post("/getCommentById", CommentController.getCommentById);

module.exports = router;
