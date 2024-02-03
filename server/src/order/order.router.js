const { Router } = require("express");
const {
  getAllOrders,
  getOrder,
  addOrder,
  markAsShipped,
  deleteOrder,
  deleteAllOrders,
  getOrdersForCustomer,
} = require("./order.controller");
const { adminOnly, auth, exists, validate } = require("../middlewares");
const { OrderModel, OrderValidationSchema } = require("./order.model");

// Create an instance of Express Router
const orderRouter = Router()
  .get("/orders", auth, adminOnly, getAllOrders)
  .get("/orders/:id", auth, exists(OrderModel), getOrder)
  .get("/orders/customer/:customerId", getOrdersForCustomer)
  .post("/orders", auth, validate(OrderValidationSchema), addOrder)
  .put("/orders/:id", auth, markAsShipped)
  .delete("/orders/deleteAll", deleteAllOrders)
  .delete("/orders", auth, adminOnly, exists(OrderModel), deleteOrder);

// Export the order router
module.exports = { orderRouter };
