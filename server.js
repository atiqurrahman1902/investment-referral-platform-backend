const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Check Environment Variables =================
console.log("==================================");
console.log("PORT :", process.env.PORT);
console.log(
  "MONGO_URL :",
  process.env.MONGO_URL
    ? process.env.MONGO_URL.replace(/\/\/(.*):(.*)@/, "//****:****@")
    : "NOT FOUND"
);
console.log("JWT_SECRET :", process.env.JWT_SECRET ? "Loaded ✅" : "NOT FOUND ❌");
console.log("==================================");

// ================= Database Connection =================
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Failed");
    console.log("Message :", err.message);
    console.log("Name    :", err.name);
    console.log("Code    :", err.code);
    console.log("Full Error:");
    console.log(err);
  });

// ================= Routes =================
app.get("/", (req, res) => {
  res.send("Investment Referral Platform Backend Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/investment", investmentRoutes);
app.use("/api/referral", referralRoutes);

// ================= Server =================
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;