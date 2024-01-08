const { CategoryModel } = require("../models/category.model");

async function createCategory(req, res) {
  const category = await CategoryModel.create(req.body);
  res.status(201).json(category);
}

async function getAllCategories(req, res) {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json("Category is missing");
  }
}

async function getCategoryById(req, res) {
  try {
    const categories = await CategoryModel.findOne({ _id: req.params.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json("Category is missing");
  }
}

module.exports = { createCategory, getAllCategories, getCategoryById };
