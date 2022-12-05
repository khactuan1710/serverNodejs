const express = require("express");
const CustomerController = require("../controller/customer.controller");
const router = express.Router();
const userController = require("../controller/auth.controller")

// const auth = require("../controller/auth.controller")
const auth = require("../middleware/auth")

router.post("/login", auth, userController.login)
router.post("/register", userController.register)

module.exports = router;
