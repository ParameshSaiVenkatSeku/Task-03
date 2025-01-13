// middleware/jwt.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET || "akv0779_paramesh";

// Function to generate a token
exports.generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // 1-hour expiration
};

// Function to verify a token
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};
