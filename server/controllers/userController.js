const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const transporter = require("../config/emailConfig");
const CLIENT_URL = require("../utils/baseURL");
const UserTokenModel = require("../models/userTokenModel");
const emailVerificationEmail = require("../utils/emailTemplates/emailVerificationEmail");
const resetPasswordEmail = require("../utils/emailTemplates/resetPasswordEmail");
const resetPasswordSuccess = require("../utils/emailTemplates/resetPasswordSuccess");
const changedPasswordSuccess = require("../utils/emailTemplates/changedPasswordSuccess");

const createToken = (_id) => {
  const jwtSecreteKey = process.env.JWT_SECRETE_KEY;

  return jwt.sign({ _id }, jwtSecreteKey, { expiresIn: process.env.EXPIRE_IN });
};

//Register Callback: Login not required
const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Ckeck that any field not be empty
    if (!name || !email || !password) {
      console.log("All fields are required!");
      return res.status(400).json({
        Status: "failed",
        message: "All fields are required...!",
      });
    }

    // Check that that user with this email already exist or not
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists...",
      });
    }

    // Validate the email that email entered is in correct email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ Status: "failed", message: "Email must be a valid email..." });
    }

    // For strong password
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        Status: "failed",
        message:
          "Password must be a strong password which includes capital letters, small letters and numbers...!",
      });
    }

    // Creating a hashCode for password and keep this hashcode in database
    // instead of actual password
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const passwordHashingCode = await bcrypt.hash(password, salt);

    // Now create and save the user in database
    const newUser = new userModel({
      name: name,
      email: email,
      password: passwordHashingCode,
    });
    await newUser.save();

    // For jwt token
    const jwt_token = createToken(newUser._id);

    // Now create model in UserTokenModel for verification of email and save it
    const userToken = new UserTokenModel({
      userId: Object(newUser._id),
      token: jwt_token,
    });
    await userToken.save();

    const emailVerificationLink = `${CLIENT_URL}/email-verification/${newUser._id}/${jwt_token}`;
    // Now Send Email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: newUser.email,
      subject: "Please verify your email address",
      html: emailVerificationEmail(
        newUser,
        emailVerificationLink,
        process.env.EMAIL_FROM
      ),
    });

    if (!info) {
      return res.status(400).json({
        status: "failed",
        message: "Something went wrong in sending email verification link...!",
      });
    }

    res.status(200).json({
      success: true,
      newUser,
      Status: "Success",
      message: "Successfully Registered...!",
      _id: newUser._id,
      name,
      email,
      jwt_token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Unable to register...!",
    });
  }
};

const verifyEmail = async (req, res) => {
  const { _id, token } = req.params;
  try {
    const user = await UserTokenModel.findOne({ userId: _id });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid or Expired Token...!",
      });
    }

    const paramsToken = String(token);

    if (user.token !== paramsToken) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid or Expired Token...!",
      });
    }

    const result = await userModel.findByIdAndUpdate(_id, {
      $set: { isVerified: true },
    });

    // Now delete the token from UserTokenModel
    await UserTokenModel.findByIdAndDelete(user._id);

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Something went wrong in email verification...!",
    });
  }
};

// Login Callback: Login not required
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ckeck that any field not be empty
    if (!email || !password) {
      return res.status(400).json({
        Status: "failed",
        message: "All fields are required...!",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ Status: "failed", message: "Invalid email or password...!" });
    }

    // Validate user password
    const validatePassword = await bcrypt.compare(password, user.password);
    if (user.email !== email || !validatePassword) {
      return res.status(400).json({
        Status: "failed",
        message: "Invalid email or Password...!",
      });
    }

    // Now start the JWT process here
    const jwt_token = createToken(user._id);

    // If user is not verified then send email verification link again
    if (!user.isVerified) {
      const result = await UserTokenModel.findOne({ userId: user._id });
      if (result) {
        // Update the token in UserTokenModel
        const newToken = jwt_token;
        const updatedToken = await UserTokenModel.findByIdAndUpdate(
          result._id,
          {
            $set: { token: newToken },
          }
        );
      } else {
        // Now create model in UserTokenModel for verification of email and save it
        const userToken = new UserTokenModel({
          userId: Object(user._id),
          token: jwt_token,
        });
        await userToken.save();
      }

      const emailVerificationLink = `${CLIENT_URL}/email-verification/${user._id}/${jwt_token}`;
      // Now Send Email
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Please verify your email address",
        html: emailVerificationEmail(
          user,
          emailVerificationLink,
          process.env.EMAIL_FROM
        ),
      });

      return res.status(400).json({
        status: "failed",
        message:
          "Email not verified. Please check your email (in spam folder also) and verify your email...!",
      });
    }

    res.status(200).json({
      success: true,
      user,
      Status: "Success",
      message: "Successfully LoggedIn...!",
      _id: user._id,
      name: user.name,
      email,
      jwt_token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Unable to login. Please try again..!",
    });
  }
};

// Controller for fetching details of Logged User: Login required
const loggedUser = async (req, res) => {
  res.send({ user: req.user });
};

// Reset User Password : Login required
// MiddlwWare: checkUserAuth is used here
// This is for if user is logged in then he can reset his password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const { _id } = req.user._id; // by params we get things which is in links
  try {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required...!" });
    }

    // Validate user password first
    const user = await userModel.findById(_id);
    const validatePassword = await bcrypt.compare(oldPassword, user.password);
    if (!validatePassword) {
      return res.status(400).json({
        Status: "failed",
        message: "Invalid old password...!",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Password and confirm password mismatched...!",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        status: "failed",
        message: "oldPassword and newPassword should not be same...!",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const newHashPassword = await bcrypt.hash(newPassword, salt);

    const result = await userModel.findByIdAndUpdate(req.user._id, {
      $set: { password: newHashPassword },
    });

    // Send the mail to user that his password has been changed successfully.
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Your password has been changed successfully.",
      html: changedPasswordSuccess(user, process.env.EMAIL_FROM),
    });

    res.status(200).json({
      status: "success",
      message: "User password changed successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Something went wrong in reset user password...!",
    });
  }
};

// Send User Password Reset Email: Login not required
const sendUserPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email field required...!" });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "User doesn't exist...!" });
    }
    const secrete = user._id + process.env.JWT_SECRETE_KEY;
    const token = jwt.sign({ _id: user._id }, secrete, { expiresIn: "60m" });

    const reset_password_link = `${CLIENT_URL}/reset-password/${user._id}/${token}`;

    // Now Send Email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Reset your Expense Management System account password",
      html: resetPasswordEmail(
        user,
        reset_password_link,
        process.env.EMAIL_FROM
      ),
    });

    res.status(200).json({
      status: "success",
      message: "Password Reset Email Sent. Please Check Your Email...!",
      "Sent Email Info": info,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Something went wrong in sending user password reset email...!",
    });
  }
};

const resetUserPasswordThroughForgotPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { _id, token } = req.params; // by params we get things which is in links
  try {
    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required...!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Password and confirm password mismatched...!",
      });
    }

    const user = await userModel.findById(_id);

    const new_secrete = user._id + process.env.JWT_SECRETE_KEY;
    const payload = jwt.verify(token, new_secrete);

    if (!payload) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid or Expired Token...!",
      });
    }

    // Now hash password and update in database
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const newHashPassword = await bcrypt.hash(password, salt);

    const result = await userModel.findByIdAndUpdate(user._id, {
      $set: { password: newHashPassword },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Your password has been reset successfully.",
      html: resetPasswordSuccess(user, process.env.EMAIL_FROM),
    });

    res.status(200).json({
      status: "success",
      message: "User password reset successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Something went wrong in reset user password...!",
    });
  }
};

module.exports = {
  registerController,
  verifyEmail,
  loginController,
  changePassword,
  sendUserPasswordResetEmail,
  loggedUser,
  resetUserPasswordThroughForgotPassword,
};
