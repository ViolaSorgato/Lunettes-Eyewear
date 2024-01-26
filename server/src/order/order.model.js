const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

// Define the schema for each order item in an order
const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, default: 0 },
  },
  { _id: false } // Exclude _id for order items
);

// Define the main schema for an order
const OrderSchema = new Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 1000000),
    },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    shipped: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true, // Add timestamps for created and updated
  }
);

// Create a model for the order using the schema
const OrderModel = models.order || model("order", OrderSchema);

// Validation schema using Joi for creating a new order
const OrderValidationSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().strict().required(),
        title: Joi.string().strict().required(),
        quantity: Joi.number().strict().required(),
        price: Joi.number(),
      })
    )
    .strict()
    .required(),
});

// Validation schema using Joi for updating an existing order
const OrderUpdateValidationSchema = OrderValidationSchema.keys({
  _id: Joi.string().strict().required(),
});

// Export the models and validation schemas
module.exports = {
  OrderModel,
  OrderValidationSchema,
  OrderUpdateValidationSchema,
};
