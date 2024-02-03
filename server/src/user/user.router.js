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
  .post("/users/register", validate(UserValidationSchema), register)
  .post("/users/login", login)
  .post("/users/logout", logout)
  .get("/users/authorize", authorize)
  .get("/users", getUsers);

module.exports = { userRouter };
