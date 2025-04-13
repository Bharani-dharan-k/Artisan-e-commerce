const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model("Account", accountSchema);
