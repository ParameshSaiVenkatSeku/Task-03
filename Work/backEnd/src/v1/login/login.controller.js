// v1/login/login.controller.js
const loginService = require("./login.service");
const jwtMiddleware = require("../../middleware/jwt"); // Adjust the path if necessary

exports.loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res
        .status(400)
        .json({ message: "Username/email and password are required." });
    }

    const result = await loginService.authenticateUser(
      usernameOrEmail,
      password
    );

    if (result.success) {
      // Generate JWT token
      const token = jwtMiddleware.generateToken({
        userId: result.user.user_id, // or whatever user field you want in the token
        username: result.user.username,
        email: result.user.email,
      });

      // Send the user data along with the token in the response
      return res.status(200).json({
        message: "Login successful",
        user: result.user,
        token: token, // Send the generated token
      });
    }

    return res.status(401).json({ message: result.message });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
