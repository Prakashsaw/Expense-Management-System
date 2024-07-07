const mongoose = require("mongoose");

const userOTPSchema = new mongoose.Schema(
  {
    expenseAppUserId: {
      type: String,
      required: true,
      ref: "users",
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  { timestamps: true }
);

// This model used for user's email verification through sending OTP on email.
const UserOTPModel = mongoose.model("userotps", userOTPSchema);

module.exports = UserOTPModel;
