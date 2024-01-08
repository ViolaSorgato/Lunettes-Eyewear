const express = require("express");
const { register } = require("./user.controller");

const userRouter = express
  .Router()
  //   .get("/users", getAllUsers)
  .post("/users/register", register);
// Other routes for CRUD operations as needed

module.exports = { userRouter };
