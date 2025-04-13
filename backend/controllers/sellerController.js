const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Seller Signup
exports.signupSeller = async (req, res) => {
  const { name, email, password } = req.body; // ✅ Ensure name is extracted

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = new Seller({ name, email, password: hashedPassword }); // ✅ Include name

    await seller.save();
    res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seller Login
exports.loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: "Seller not found" });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, sellerId: seller._id, totalSales: seller.totalSales || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

