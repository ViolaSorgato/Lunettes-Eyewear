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
  .get("/orders", auth, adminOnly, getAllOrders) // Get all orders (admin access required)
  .get("/orders/:id", auth, exists(OrderModel), getOrder) // Get a specific order by ID (user authentication required)
  .get("/orders/customer/:customerId", getOrdersForCustomer) // Get all orders for a specific customer (user authentication required)
  .post("/orders", auth, validate(OrderValidationSchema), addOrder) // Add a new order (user authentication required, request validation)
  .put("/orders/:id", auth, markAsShipped) // Mark an order as shipped (user authentication required)
  .delete("/orders/deleteAll", deleteAllOrders)
  .delete("/orders", auth, adminOnly, exists(OrderModel), deleteOrder);

// Export the order router
module.exports = { orderRouter };
