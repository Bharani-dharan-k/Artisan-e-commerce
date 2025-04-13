const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

const router = express.Router();

// ✅ Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ Fetch products for a seller
router.get("/", async (req, res) => {
  try {
    const sellerId = req.query.sellerId;
    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    const products = await Product.find({ sellerId });
    console.log("✅ Products from DB:", products);

    res.json({ products });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ✅ Add a new product (with image upload)
router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { name, price, sellerId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProduct = new Product({
      name,
      price,
      sellerId,
      image: req.file.filename, // ✅ Store filename only
    });

    await newProduct.save();
    res.status(201).json({ message: "✅ Product added successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ message: "Error adding product" });
  }
});

module.exports = router;
