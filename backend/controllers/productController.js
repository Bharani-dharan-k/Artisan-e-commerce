const Product = require("../models/Product");

const Product = require("../models/Product"); // Import Product model

exports.addProduct = async (req, res) => {
  try {
    const { name, price, sellerId } = req.body;
    const image = req.file ? req.file.path : null;

    const newProduct = new Product({ name, price, sellerId, image });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.params.sellerId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
