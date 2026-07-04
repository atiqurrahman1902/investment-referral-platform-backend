const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      referralCode,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashPassword,
      referralCode: "REF" + Date.now(),
    });

    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare Password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    // Generate JWT Token
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};