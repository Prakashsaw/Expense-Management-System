const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    expenseAppUserId: {
      type: String,
      required: true,
      ref: "users",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 7000,
    },
  },
  { timestamps: true }
);

// This model used for user's email verification
const UserTokenModel = mongoose.model("tokens", tokenSchema);

module.exports = UserTokenModel;
