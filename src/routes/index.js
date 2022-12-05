const express = require("express");
const router = express.Router();
const Book = require("./book.routes");
const Customer = require("./customer.routes");
const user = require("./user.router");
const Comment = require("./comment.routes");

router.get("/", function (req, res, next) {
    res.render("../views/index.ejs")
})
router.use("/api", Book);
router.use("/api", Customer);
router.use("/api", Comment)
router.use("/auth", user)

module.exports = router;
