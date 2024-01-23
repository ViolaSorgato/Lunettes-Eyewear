const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

// Define the Mongoose schema for the User model
const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false }, // 'select: false' so that the password is included in query results
  isAdmin: { type: Boolean, required: true, default: false },
});

// Create a Mongoose model based on the schema
const UserModel = models.User || model("User", UserSchema);

// Define a Joi validation schema for user input validation
const UserValidationSchema = Joi.object({
  username: Joi.string().strict().required(),
  email: Joi.string().email().strict().required(),
  password: Joi.string().strict().required().min(6),
  isAdmin: Joi.boolean().strict(),
});

// Export the Mongoose model and the Joi validation schema
module.exports = { UserModel, UserValidationSchema };
