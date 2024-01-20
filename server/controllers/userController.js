const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const dotenv = require("dotenv");
dotenv.config();
// login callback

const createToken = (_id) => {
  const jwtSecreteKey = process.env.JWT_SECRETE_KEY;

  return jwt.sign({ _id }, jwtSecreteKey, { expiresIn: "10d" });
};

//Register Callback
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
        message: "Password must be a strong password...",
      });
    }

    // Creating a hashCode for password and keep this hashcode in database
    // instead of actual password
    const salt = await bcrypt.genSalt(10);
    const passwordHashingCode = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: passwordHashingCode,
    });
    await newUser.save();

    // For jwt token
    const jwt_token = createToken(newUser._id);

    res.status(200).json({
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
      error: error,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ckeck that any field not be empty
    if (!email || !password) {
      console.log("All fields are required!");
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
    res
      .status(400)
      .json({ status: "failed", message: "Unable to login...!", error: error });
  }
};

module.exports = { registerController, loginController };
