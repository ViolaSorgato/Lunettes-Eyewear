const { ProductModel } = require("./product.model");
const { initStripe } = require("../stripe");
const stripe = initStripe();

// //Get all products
// async function getAllProducts(req, res) {
//   const products = await ProductModel.find({ deleted: false });
//   res.status(200).json(products);
// }

async function getAllProducts(req, res) {
  try {
    const products = await stripe.products.list({
      limit: 10,
      expand: ["data.default_price"],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

//Delete product
async function deleteProduct(req, res) {
  await ProductModel.findOneAndDelete({ _id: req.params.id });
  res.status(204).json(null);
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
