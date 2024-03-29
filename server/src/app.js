const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const secretKey = process.env.COOKIE_SECRET_KEY;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");

const app = express();
require("express-async-errors");

// Validate environment variables
if (!process.env.COOKIE_SECRET_KEY) {
  throw new Error("Missing COOKIE_SECRET_KEY environment variable");
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

//Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  cookieSession({
    name: "MYCOOKIE",
    keys: [secretKey],
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

//Routers
const { productRouter } = require("./product/product.router");
const { checkoutRouter } = require("./checkout/checkout.router");
const { userRouter } = require("./user/user.router");
const { categoryRouter } = require("./category/category.router");
const { orderRouter } = require("./order/order.router");

// Add routers
app.use("/api", productRouter);
app.use("/api", checkoutRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", orderRouter);

module.exports = { app };
