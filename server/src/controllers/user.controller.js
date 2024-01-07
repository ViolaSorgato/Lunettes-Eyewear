const UserModel = require("../models/user.model");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const newUser = new UserModel({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json(newUser); // Return the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  register,
  // Other controller functions as needed
};
