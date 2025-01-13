// v1/login/login.service.js
const { getUserByEmail, getUserByUsername } = require("./login.queries");
const crypto = require("crypto-js");

exports.authenticateUser = async (usernameOrEmail, password) => {
  try {
    let user;

    if (usernameOrEmail.includes("@")) {
      user = await getUserByEmail(usernameOrEmail);
    } else {
      user = await getUserByUsername(usernameOrEmail);
    }

    if (!user) {
      return { success: false, message: "User not found." };
    }

    // Hash and compare password
    const hashedPassword = crypto.SHA256(password).toString();
    if (hashedPassword !== user.password) {
      return { success: false, message: "Invalid password." };
    }

    // Exclude the password from the response
    const { password: _, ...userData } = user;
    return { success: true, user: userData };
  } catch (error) {
    console.error("Authentication Error:", error);
    return { success: false, message: "Internal server error." };
  }
};
