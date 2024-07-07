const express = require("express");
const {
  registerController,
  sendUserPasswordResetEmail,
  resetUserPasswordThroughForgotPassword,
  loggedUser,
  changePassword,
  verifyEmail,
  sendEmailForOTPVerification,
  verifyEmailThroughOTP,
  sendOTPForMobileVerification,
  verifyMobileNumberThroughOTP,
  updateUserProfile,
  loginControllerThroughEmail,
} = require("../controllers/userController");

const checkUserAuth = require("../middleware/userAuth");

//router object
const router = express.Router();

// Public routes
// POST : REGISTER USER
router.post("/register", registerController);
// POST: Verify email
router.post("/verify-email/:expenseAppUserId/:token", verifyEmail);
// POST : LOGIN USER
router.post("/login", loginControllerThroughEmail);
// POST : Send reset password email
router.post("/send-reset-password-email", sendUserPasswordResetEmail);
// Reset password through forgot password email
router.post(
  "/reset-password/:expenseAppUserId/:token",
  resetUserPasswordThroughForgotPassword
);

// OTP Verification through email
router.post("/send-email-otp", sendEmailForOTPVerification);
// verify OTP
router.post("/verify-email-otp/:expenseAppUserId", verifyEmailThroughOTP);

// OTP Verification through mobile number
router.post("/send-phone-otp", sendOTPForMobileVerification);
// verify OTP
router.post("/verify-phone-otp", verifyMobileNumberThroughOTP);

// Protected routes
// All routes after this middleware will be protected
// Like: Access to dashboard, update user profile, change password etc
// POST : CHANGE USER PROFILE
router.post("/update-user-profile", checkUserAuth, updateUserProfile);
// POST : CHANGE PASSWORD
router.post("/change-password", checkUserAuth, changePassword);
// GET : LOGGED USER / USER PROFILE
router.get("/logged-user", checkUserAuth, loggedUser);

// Export the router
module.exports = router;
