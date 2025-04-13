const Seller = require("../models/Seller");

// Get seller profile
const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json(seller);
  } catch (error) {
    console.error("Error fetching seller profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update seller account
const updateAccount = async (req, res) => {
  const { name, email, profileImage } = req.body;

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.sellerId,
      { name, email, profileImage },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ message: "Account updated successfully", seller: updatedSeller });
  } catch (error) {
    console.error("Error updating seller account:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete seller account
const deleteAccount = async (req, res) => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.params.sellerId);
    if (!deletedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting seller account:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSellerProfile, updateAccount, deleteAccount };
