const Product = require("../models/product");

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product Created" });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(204).json({ message: "No products found" });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Product Id required" });

  try {
    const productFind = await Product.findById(id);

    if (!productFind)
      return res.status(404).json({ message: "No product matches Id" });

    res.status(200).json(productFind);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Id parameter required" });

  try {
    await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json({ msg: "Product Update" });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Id parameter required" });

  try {
    await Product.findByIdAndRemove(id);
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
