const express = require("express");
const {
  contactUsMessageController,
} = require("../controllers/userInforController");

const router = express.Router();

router.post("/contact-us", contactUsMessageController);

module.exports = router;
