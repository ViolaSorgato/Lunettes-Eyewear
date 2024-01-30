const express = require("express");
const { checkout } = require("./checkout.controller");

// Express router for handling checkout-related routes
const checkoutRouter = express.Router();

// Route to create a new checkout session using the checkout controller
checkoutRouter.post("/create-checkout-session", checkout);

module.exports = { checkoutRouter };
