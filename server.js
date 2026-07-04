const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const referralRoutes = require("./routes/referralRoutes");
const roiRoutes = require("./routes/roiRoutes");

// Cron Job
require("./cron/roiScheduler");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Investment Referral Platform API is Running..."
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/investment", investmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/roi", roiRoutes);

// Handle Invalid Routes
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`MongoDB Connected`);
    console.log(`Server running on port ${PORT}`);
});