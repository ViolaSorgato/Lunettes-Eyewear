const { Router } = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/category.controller");

const { exists } = require("../middlewares");
const { CategoryModel } = require("../models/category.model");

const categoryRouter = Router()
  .post("/categories", createCategory)
  .get("/categories", getAllCategories)
  .get("/categories/:id", exists(CategoryModel), getCategoryById);

module.exports = { categoryRouter };
