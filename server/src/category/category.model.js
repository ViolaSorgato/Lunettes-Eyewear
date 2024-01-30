const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

// Defining the schema for the Category model
const CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false }
);

// Creating the Category model or using an existing one if available
const CategoryModel = models.category || model("category", CategorySchema);

// Validation schema for creating a new category
const CategoryCreateValidationSchema = Joi.object({
  title: Joi.string().strict().required(),
  description: Joi.string().strict().required(),
});

// Validation schema for updating a category (includes _id)
const CategoryUpdateValidationSchema = CategoryCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
});

module.exports = {
  CategoryModel,
  CategorySchema,
  CategoryCreateValidationSchema,
  CategoryUpdateValidationSchema,
};
