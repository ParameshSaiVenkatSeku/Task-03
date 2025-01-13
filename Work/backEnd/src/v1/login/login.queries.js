const db = require("../../mysql/knexfile");

exports.getUserByEmail = async (email) => {
  const user = await db("users").where("email", email).first(); // Retrieves the first matching user based on email
  return user;
};

exports.getUserByUsername = async (username) => {
  const user = await db("users").where("username", username).first(); // Retrieves the first matching user based on username
  return user;
};
