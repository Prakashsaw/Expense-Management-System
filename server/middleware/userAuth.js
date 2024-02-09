const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  // console.log(authorization);

  try {
    if (authorization && authorization.startsWith("Bearer")) {
      // Get token from header
      token = authorization.split(" ")[1];
      // console.log("Token:", token);

      // Verify Token
      const { _id } = jwt.verify(token, process.env.JWT_SECRETE_KEY);

      // Get user from token
      // Selecting all userDetailes except password so thats why we will do "-password"
      req.user = await userModel.findById({ _id }).select("-password");
      next();
    } else {
      res
        .status(401)
        .send({ status: "failed", message: "Unauthorized User, No token...!" });
    }
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "Unauthorized User, No token...!",
    });
  }
};

module.exports = checkUserAuth;
