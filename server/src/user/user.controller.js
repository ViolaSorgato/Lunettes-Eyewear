const { UserModel } = require("../user/user.model");
const bcrypt = require("bcrypt");

// AUTHORIZATION
async function authorize(req, res) {
  // Check if the user is logged in
  if (!req.session._id) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  // Return user session information if logged in
  return res.status(200).json(req.session);
}

// Get all users
async function getUsers(req, res) {
  try {
    // Fetch all users from the database
    const users = await UserModel.find();

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Register new user
async function register(req, res) {
  // Check if the user already exists with the provided email
  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already registered" });
  }

  // Hash the user's password before saving to the database
  const user = new UserModel(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  // Prepare the user data to be sent in the response
  const jsonUser = user.toJSON();
  jsonUser._id = user._id;
  delete jsonUser.password;

  // Send a success response with the user data
  res.status(201).send(jsonUser);
}

// Login user
async function login(req, res) {
  // Check if the username and password are correct
  const existingUser = await UserModel.findOne({
    email: req.body.email,
  }).select("+password");

  if (
    !existingUser ||
    !(await bcrypt.compare(req.body.password, existingUser.password))
  ) {
    return res.status(401).json({ error: "Wrong password or username" });
  }

  // Prepare user data for response
  const user = existingUser.toJSON();
  user._id = existingUser._id;
  delete user.password;

  // Check if the user is already logged in
  if (req.session._id) {
    return res.status(200).json(user);
  }

  // Save user info to the session (encrypted cookie stored on the client)
  req.session = user;
  res.status(200).json(user);
}

// Logout the user and remove the cookie and session
async function logout(req, res) {
  // Check if the user is logged in
  if (!req.session || !req.session._id) {
    return res
      .status(400)
      .json({ error: "Cannot logout when you are not logged in" });
  }

  // Remove the session
  req.session = null;
  res.status(204).json(null);
}

module.exports = { getUsers, register, login, logout, authorize };
