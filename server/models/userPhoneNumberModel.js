const mongoose = require("mongoose");

const userPhoneNumberSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// This model used for user's phone verification through sending OTP on phone.
const UserPhoneNumberModel = mongoose.model(
  "userphonenumber",
  userPhoneNumberSchema
);

module.exports = UserPhoneNumberModel;
