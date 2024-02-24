import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import EmailSent from "./pages/ForgotPassword/EmailSent";
import TermsAndConditions from "./pages/UserAgreement/TermsAndConditions";
import PrivacyAndPolicy from "./pages/UserAgreement/PrivacyAndPolicy";
import EmailVerification from "./pages/EmailVerification/EmailVerification";
import PasswordResetSuccess from "./pages/ForgotPassword/PasswordResetSuccess";
import SignUpSuccess from "./pages/EmailVerification/SignUpSuccess";
import UserProfile from "./pages/UserDetails/UserProfile";
import Home from "./components/Layout/Home";
import SendOTPAndVerifyEmail from "./pages/OTPEmailVerification/SendOTPAndVerifyEmail";
import SendOTPAndVerifyPhone from "./pages/OTPPhoneVerification/SendOTPAndVerifyPhone";
import OTPVerifiedSuccess from "./pages/OTPEmailVerification/OTPVerifiedSuccess";
import ChangePassword from "./pages/UserDetails/ChangePassword";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/user"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/user-profile"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/change-password"
          element={
            <ProtectedRoutes>
              <ChangePassword />
            </ProtectedRoutes>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
        <Route
          path="/email-verification/:_id/:token"
          element={<EmailVerification />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-email-sent" element={<EmailSent />} />
        <Route path="/reset-password/:_id/:token" element={<ResetPassword />} />
        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccess />}
        />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyAndPolicy />} />
        {/* send otp and verify email */}
        <Route
          path="/email-otp-verification"
          element={<SendOTPAndVerifyEmail />}
        />
        {/* Send OTP and verify phone */}
        <Route
          path="/phone-otp-verification"
          element={<SendOTPAndVerifyPhone />}
        />
        <Route path="/otp-verified-success" element={<OTPVerifiedSuccess />} />
        {/* if path is not correct then navigate to page not found page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default App;
