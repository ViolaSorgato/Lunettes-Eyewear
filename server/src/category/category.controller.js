const { CategoryModel } = require("./category.model");

// Function to create a new category
async function createCategory(req, res) {
  const category = await CategoryModel.create(req.body);
  res.status(201).json(category);
}

// Async function to get all categories
async function getAllCategories(req, res) {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json("Category is missing");
  }
}

// Async function to get a category by its ID
async function getCategoryById(req, res) {
  try {
    const category = await CategoryModel.findOne({ _id: req.params.id });
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json("Category is missing");
  }
}

module.exports = { createCategory, getAllCategories, getCategoryById };
