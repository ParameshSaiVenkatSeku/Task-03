const { createUser, isEmailTaken } = require("./register.queries");
const crypto = require("crypto-js");

exports.createUser = async (userData) => {
  const { first_name, last_name, email, password } = userData;

  const emailExists = await isEmailTaken(email);
  if (emailExists) {
    return { success: false, message: "Email already exists." };
  }

  const timestamp = Date.now();
  const username = `${first_name.charAt(0).toLowerCase()}${last_name
    .charAt(0)
    .toLowerCase()}${timestamp.toString().slice(-4)}`;

  const hashedPassword = crypto.SHA256(password).toString();

  await createUser({
    ...userData,
    username,
    password: hashedPassword,
  });

  return { success: true, message: "User registered successfully.", username };
};
