const express = require("express");
const { updateAccount, deleteAccount, getSellerProfile } = require("../controllers/accountController");

const router = express.Router();

router.get("/:sellerId", getSellerProfile); // Get seller profile
router.put("/:sellerId", updateAccount); // Update seller account
router.delete("/:sellerId", deleteAccount); // Delete seller account

module.exports = router;
