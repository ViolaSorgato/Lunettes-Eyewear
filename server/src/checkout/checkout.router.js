const express = require("express");
const { checkout } = require("./checkout.controller");
const checkoutRouter = express
  .Router()

  .post("/checkout", checkout);

module.exports = { checkoutRouter };
