const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Ensure name is required
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: String, // Optional field
});

module.exports = mongoose.model("Seller", sellerSchema);
