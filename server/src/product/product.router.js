const { Router } = require("express");
const {
  addProduct,
  deleteProduct,
  deleteAllProducts,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
} = require("./product.controller");

const { adminOnly, auth, exists, validate } = require("../middlewares");
const {
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
  ProductModel,
} = require("./product.model");

const { CategoryModel } = require("../category/category.model");

// Creating an Express router for handling product-related routes
const productRouter = Router()
  .get("/products", getProducts)
  .delete("/products/deleteAll", auth, adminOnly, deleteAllProducts)
  .get("/products/:id", exists(ProductModel), getProductById)
  .get("/products/byCategory/:id", exists(CategoryModel), getProductsByCategory)
  .post(
    "/products",
    auth,
    adminOnly,
    validate(ProductCreateValidationSchema),
    addProduct
  )
  .put(
    "/products/:id",
    auth,
    adminOnly,
    exists(ProductModel),
    validate(ProductUpdateValidationSchema),
    updateProduct
  )
  .delete(
    "/products/:id",
    auth,
    adminOnly,
    exists(ProductModel),
    deleteProduct
  );

module.exports = { productRouter };
