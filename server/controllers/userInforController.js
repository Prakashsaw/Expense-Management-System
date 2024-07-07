const transporter = require("../config/emailConfig");
const ContactUsMessageModel = require("../models/contactUsMessageModel");
const contactUsMessageSentSuccess = require("../utils/emailTemplates/contactUsMessageSent");
const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const contactUsMessageController = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required...!" });
    }

    const user = await ContactUsMessageModel.findOne({ email });

    if (user) {
      user.name = name;
      user.email = email;
      user.message = message;
      await user.save();
    } else {
      // const nanoId = nanoid(10);
      const nanoid = customAlphabet(alphabet, 10); // 10 is the length of the Nano ID
      const nanoId = nanoid();
      console.log("contactUsUserId: ", nanoId);
      const newUser = new ContactUsMessageModel({
        contactUsUserId: nanoId,
        name,
        email,
        message,
      });
      await newUser.save();
    }
    const updatedUser = await ContactUsMessageModel.findOne({
      email,
    });

    // send an email for confirmation
    const info = await transporter.sendMail({
      from: {
        name: "Expense Management System",
        address: process.env.EMAIL_FROM,
      },
      to: updatedUser.email,
      subject: "Your contact us message sent successfully.",
      html: contactUsMessageSentSuccess(updatedUser, process.env.EMAIL_FROM),
    });

    res.status(200).json({
      status: "success",
      message: "Message sent successfully...!",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internel Server error. Can't send message...!",
    });
  }
};

module.exports = { contactUsMessageController };
