const mongoose = require("mongoose");

const userSchemaForGoogleAuth = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserGoogleAuthModel = mongoose.model(
  "usergoogleauth",
  userSchemaForGoogleAuth
);

module.exports = UserGoogleAuthModel;
