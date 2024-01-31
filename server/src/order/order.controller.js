const { OrderModel } = require("./order.model");
const { ProductModel } = require("../product/product.model");

// Get all orders
const getAllOrders = async (req, res) => {
  // Set query based on user's admin status
  const query = req.session.isAdmin ? {} : { customer: req.session._id };

  // Retrieve orders from the database, populating the "customer" field
  const orders = await OrderModel.find(query).populate("customer");

  // Send the orders in the response
  res.status(200).json(orders);
};

// Get a specific order by ID
const getOrder = async (req, res) => {
  // Find the order by ID, populating "customer" and "orderItems.product" fields
  const order = await OrderModel.findById(req.params.id)
    .populate("customer")
    .populate("orderItems.product");

  // Check if the user has permission to access the order
  if (
    !req.session.isAdmin &&
    req.session._id.toString() !== order.customer._id.toString()
  ) {
    return res
      .status(403)
      .json("You do not have permissions to perform this request");
  }

  // Send the order in the response
  res.status(200).json(order);
};

// Get all orders for a specific customer
const getOrdersForCustomer = async (req, res) => {
  // Check if the user has permission to access orders for the specified customer
  if (!req.session.isAdmin && req.params.customerId !== req.session._id) {
    return res
      .status(403)
      .json("You do not have permissions to perform this request");
  }

  try {
    // Find all orders for the specified customer, populating "orderItems.product" field
    const orders = await OrderModel.find({ customer: req.params.customerId })
      .populate("orderItems.product")
      .exec();

    // Send the orders in the response
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a new order
const addOrder = async (req, res, next) => {
  try {
    // Adjust inStock quantity for each product in the order
    for (const orderItem of req.body.orderItems) {
      let product = await ProductModel.findById(orderItem.product);

      if (product) {
        product.inStock -= orderItem.quantity;
        orderItem.price = product.price * orderItem.quantity;
        await product.save();
      }
    }

    // Create a new order, setting customer and orderNumber
    const order = new OrderModel({
      ...req.body,
      customer: req.session._id,
      orderNumber: Math.floor(Math.random() * 1000000),
    });

    // Save the order to the database
    await order.save();

    // Send the new order in the response
    res.status(201).json(order);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Mark an order as shipped
async function markAsShipped(req, res) {
  // Find and update the order to set "shipped" to true
  const order = await OrderModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { shipped: true } },
    { new: true }
  );

  // Send the updated order in the response
  res.status(200).json(order);
}

//Delete specific order
async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    console.log("Deleting order with ID:", orderId);

    await OrderModel.findOneAndDelete({ _id: orderId });
    res.status(204).json(null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete all orders
async function deleteAllOrders(req, res) {
  try {
    const result = await OrderModel.deleteMany({});
    res.status(204).json(null);
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.status(500).json(err);
  }
}

// Export all the controller functions
module.exports = {
  getAllOrders,
  getOrder,
  getOrdersForCustomer,
  addOrder,
  markAsShipped,
  deleteOrder,
  deleteAllOrders,
};
