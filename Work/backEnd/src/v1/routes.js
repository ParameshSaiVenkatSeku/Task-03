const express = require("express");
const app = express();
const loginRoutes = require("./login/login.routes");
const registerRoutes = require("./register/register.routes");

const router = express.Router();
router.use("/login", loginRoutes);
router.use("/register", registerRoutes);

module.exports = router;
