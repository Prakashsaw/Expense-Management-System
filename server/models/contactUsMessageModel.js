const mongoose = require("mongoose");

const contactUsMessageSchema = new mongoose.Schema(
  {
    contactUsUserId: {type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactUsMessageModel = mongoose.model(
  "contactusmessages",
  contactUsMessageSchema
);

module.exports = ContactUsMessageModel;
