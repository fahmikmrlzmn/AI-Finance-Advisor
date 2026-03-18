const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ FIX: allow frontend requests

// Import routes
const authRoute = require("./routes/auth");
const transactionRoute = require("./routes/transactions");
const aiRoute = require("./routes/ai");

// Routes
app.use("/api/auth", authRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/ai", aiRoute);

// Root route
app.get("/", (req, res) => {
  res.send("AI Finance Advisor Backend is running 🚀");
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

// ✅ FIX: correct env variable name
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

module.exports = app;