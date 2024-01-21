const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, default: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 1000000),
    },
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    shipped: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

const OrderModel = models.order || model("order", OrderSchema);

const OrderValidationSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().strict().required(),
        quantity: Joi.number().strict().required(),
        price: Joi.number(),
      })
    )
    .strict()
    .required(),
});

const OrderUpdateValidationSchema = OrderValidationSchema.keys({
  _id: Joi.string().strict().required(),
});

module.exports = {
  OrderModel,
  OrderValidationSchema,
  OrderUpdateValidationSchema,
};
