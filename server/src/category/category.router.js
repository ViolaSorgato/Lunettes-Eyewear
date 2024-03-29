const { Router } = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
} = require("./category.controller");
const { exists } = require("../middlewares");
const { CategoryModel } = require("./category.model");

// Creating an Express router for handling category-related routes
const categoryRouter = Router()
  .post("/categories", createCategory)
  .get("/categories", getAllCategories)
  .get("/categories/:id", exists(CategoryModel), getCategoryById);

module.exports = { categoryRouter };
