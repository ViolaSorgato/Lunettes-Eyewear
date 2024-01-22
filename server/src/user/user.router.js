const express = require("express");
const {
  register,
  login,
  logout,
  authorize,
  getUsers,
} = require("./user.controller");
const { UserValidationSchema } = require("./user.model");
const { validate } = require("../middlewares");

// Create an Express Router instance
const userRouter = express.Router();

// Define routes for user registration, login, logout, and authorization
userRouter
  .post("/users/register", validate(UserValidationSchema), register) // Validate user input before registering
  .post("/users/login", login) // Login route
  .post("/users/logout", logout) // Logout route
  .get("/users/authorize", authorize) // Authorization route
  .get("/users", getUsers); //Get all users

// Export the userRouter for use in other parts of the application
module.exports = { userRouter };
