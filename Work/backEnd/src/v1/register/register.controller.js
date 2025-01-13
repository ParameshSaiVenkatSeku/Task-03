const registerService = require("./register.services");

exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, password, email, profile_pic, thumbnail } =
      req.body;

    if (!first_name || !last_name || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const result = await registerService.createUser({
      first_name,
      last_name,
      password,
      email,
      profile_pic,
      thumbnail,
    });

    if (result.success) {
      return res.status(201).json(result);
    }

    return res.status(400).json({ message: result.message });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
