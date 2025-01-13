const express = require("express");
const router = express.Router();
const loginController = require("./login.controller");

router.post("/", loginController.loginUser);

module.exports = router;
