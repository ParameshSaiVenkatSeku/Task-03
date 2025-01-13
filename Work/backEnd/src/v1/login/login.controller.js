const loginService = require("./login.service");

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
      return res.status(200).json(result);
    }

    return res.status(401).json({ message: result.message });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
