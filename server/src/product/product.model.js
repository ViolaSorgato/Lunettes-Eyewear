const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

//Defining the Schema for the Product Model
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    inStock: { type: Number, required: true, default: 0 },
    category: {
      type: [Schema.Types.ObjectId],
      ref: "category",
      required: false,
    },
    deleted: { type: Boolean, required: false, default: false },
  },
  { versionKey: false }
);

// Creating the Product model or using an existing one if available
const ProductModel = models.product || model("product", ProductSchema);

// Validation schema for creating a new product
const ProductCreateValidationSchema = Joi.object({
  title: Joi.string().strict().required(),
  description: Joi.string().strict().required(),
  price: Joi.number().strict().required(),
  image: Joi.string().uri().allow("image/png", "image/jpeg").required(),
  inStock: Joi.number().strict().required(),
  category: Joi.array().min(1),
});

// Validation schema for updating a product (includes _id and deleted flag)
const ProductUpdateValidationSchema = ProductCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
  deleted: Joi.boolean().strict().required(),
});

module.exports = {
  ProductModel,
  ProductSchema,
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
};
