const { ProductModel } = require("./product.model");
const { initStripe } = require("../stripe");
const stripe = initStripe();

//Get all products
async function getProducts(req, res) {
  const products = await ProductModel.find({ deleted: false });
  res.status(200).json(products);
}

//Get specific product
async function getProductById(req, res) {
  const product = await ProductModel.findOne({
    _id: req.params.id,
    deleted: false,
  });
  res.status(200).json(product);
}

//Get product by category
async function getProductsByCategory(req, res) {
  const products = await ProductModel.find({
    category: { $in: [req.params.id] },
  });
  res.status(200).json(products);
}

//Add new product
async function addProduct(req, res, next) {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

//Update product
async function updateProduct(req, res) {
  if (req.body._id !== req.params.id) {
    return res.status(400).json("Body and param id are not the same");
  }

  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(product);
}

//Delete specific product
async function deleteProduct(req, res) {
  await ProductModel.findOneAndDelete({ _id: req.params.id });
  res.status(204).json(null);
}

// Delete all products
async function deleteAllProducts(req, res) {
  try {
    const result = await ProductModel.deleteMany({});
    res.status(204).json(null);
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getProductsByCategory,
};
