const transporter = require("../config/emailConfig");
const ContactUsMessageModel = require("../models/contactUsMessageModel");
const contactUsMessageSentSuccess = require("../utils/emailTemplates/contactUsMessageSent");

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
      // then update the user with new message
      await ContactUsMessageModel.findOneAndUpdate(
        { name },
        { email },
        { message },
        { new: true }
      );
    } else {
      // create new user
      const newUser = new ContactUsMessageModel({
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
