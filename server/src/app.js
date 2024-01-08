const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("express-async-errors");
const secretKey = process.env.COOKIE_SECRET_KEY;

const { productRouter } = require("./product/product.router");
// const { orderRouter } = require("./resources/order/order.router");
const { userRouter } = require("./user/user.router");
const { categoryRouter } = require("./category/category.router");
// const { errorRequestHandler } = require("./error");
// const {

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
// app.use(
//   cookieSession({
//     name: "session",
//     keys: [secretKey],
//     maxAge: 1000 * 60 * 60 * 24, // 24 Hours
//     sameSite: "strict",
//     httpOnly: true,
//     secure: false,
//   })
// );

// Add routers
app.use("/api", productRouter);
// app.use("/api", orderRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);

// app.use((req, res) => {
//   console.log("!404!");
//   res.status(404).json("Missing resource");
// });

// // Error handler
// app.use(errorRequestHandler);

module.exports = { app };
