const express = require("express");
const {
  loginController,
  registerController,
  sendUserPasswordResetEmail,
  resetUserPasswordThroughForgotPassword,
  loggedUser,
  changePassword,
  verifyEmail,
} = require("../controllers/userController");
const checkUserAuth = require("../middleware/userAuth");

//router object
const router = express.Router();

// Public routes
//POST : REGISTER USER
router.post("/register", registerController);
// POST: Verify email
router.post("/verify-email/:_id/:token", verifyEmail);
// POST : LOGIN USER
router.post("/login", loginController);
// POST : Send reset password email
router.post("/send-reset-password-email", sendUserPasswordResetEmail);
// Reset password through forgot password email
router.post(
  "/reset-password/:_id/:token",
  resetUserPasswordThroughForgotPassword
);

// Protected routes
// All routes after this middleware will be protected
// Like: Access to dashboard, change password, forgot password, etc
// POST : CHANGE PASSWORD
router.post("/change-password", checkUserAuth, changePassword);
// GET : LOGGED USER / USER PROFILE
router.get("/logged-user", checkUserAuth, loggedUser);

// Export the router
module.exports = router;
