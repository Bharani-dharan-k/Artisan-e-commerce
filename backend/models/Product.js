const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  sellerId: String,
  image: String, // ✅ Ensure this field exists
  sold: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
