const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema(
  {
    expenseAppUserId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      default: "Not Provided",
    },
    address: {
      type: String,
      default: "Not Provided",
    },
    birthDate: {
      type: String,
      default: "Not Provided",
    },
    favouriteSport: {
      type: String,
      default: "Not Provided",
    },
  },
  { timestamps: true }
);

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
