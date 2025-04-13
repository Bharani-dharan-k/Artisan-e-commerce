require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const morgan = require("morgan"); // Logging middleware

// Import Routes
const productRoutes = require("./routes/productRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const accountRoutes = require("./routes/accountRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Added Admin Routes

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(morgan("dev")); // Logging requests
app.use(express.json({ limit: "10mb" })); // Increased payload limit for large images
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static images

// ✅ Validate Environment Variables
const { MONGO_URI, BREVO_API_KEY, RECIPIENT_EMAIL } = process.env;
if (!MONGO_URI || !BREVO_API_KEY || !RECIPIENT_EMAIL) {
  console.error("❌ Missing required environment variables. Check your .env file!");
  process.exit(1);
}

// ✅ MongoDB Connection with Enhanced Error Handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/admin", adminRoutes); // Integrated Admin Routes

// ✅ Contact Form Route (Send Email using Brevo)
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "⚠️ All fields are required!" });
  }

  // ✅ Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "⚠️ Invalid email address format!" });
  }

  const emailData = {
    sender: { name: "Your Website", email: "bhupeegayu24@gmail.com" },
    to: [{ email: RECIPIENT_EMAIL, name: "Admin" }],
    subject: `📩 New Contact Message from ${name}`,
    htmlContent: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    const response = await axios.post("https://api.brevo.com/v3/smtp/email", emailData, {
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
    });

    console.log(`✅ Email sent successfully: ${response.data.messageId}`);
    res.status(200).json({ success: true, message: "📨 Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "⚠️ Failed to send email. Please try again later.",
      error: error.response?.data || error.message,
    });
  }
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🚀 MERN Stack Backend is Running...");
});

// ✅ Global Error Handler (For better debugging)
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

// ✅ Start Server After MongoDB Connection
connectDB().then(() => {
  const server = app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

  // Handle graceful shutdown
  process.on("SIGINT", async () => {
    console.log("❗ Server shutting down...");
    await mongoose.connection.close();
    server.close(() => process.exit(0));
  });

  process.on("SIGTERM", async () => {
    console.log("❗ SIGTERM received, closing server...");
    await mongoose.connection.close();
    server.close(() => process.exit(0));
  });
});
