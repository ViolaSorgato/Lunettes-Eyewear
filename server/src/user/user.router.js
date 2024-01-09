const express = require("express");
const { register, login, logout, authorize } = require("./user.controller");
const { UserValidationSchema } = require("./user.model");
const { validate } = require("../middlewares");

const userRouter = express
  .Router()
  .post("/users/register", validate(UserValidationSchema), register)
  .post("/users/login", login)
  .post("/users/logout", logout)
  .get("/users/authorize", authorize);

module.exports = { userRouter };
