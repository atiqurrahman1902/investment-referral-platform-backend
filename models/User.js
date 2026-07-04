const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    referralCode: {
      type: String,
      unique: true,
      index: true
    },

    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    walletBalance: {
      type: Number,
      default: 0
    },

    totalROI: {
      type: Number,
      default: 0
    },

    totalLevelIncome: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

// Compound Index
userSchema.index({
  referralCode: 1,
  email: 1
});

module.exports = mongoose.model("User", userSchema);