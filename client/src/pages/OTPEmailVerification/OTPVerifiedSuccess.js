import { Alert, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./OTPVerifiedSuccess.css";
const OTPVerifiedSuccess = () => {
  const navigate = useNavigate();

  const onClickHandler = async () => {
    navigate("/login");
  };
  return (
    <>
      <div className="content container mt-4 layout">
        <div className="otp-verify-page ">
          <Alert
            message="OTP Verified successfully."
            description="You OTP has been verified successfully."
            type="success"
            showIcon
            style={{
              margin: 50,
              marginLeft: 200,
              marginRight: 200,
              padding: 50,
              borderRadius: 10,
              backgroundColor: "#f6ffed",
            }}
          />
          <Button
            type="primary"
            style={{
              marginLeft: 0,
              borderRadius: 3,
            }}
            onClick={onClickHandler}
          >
            Back to Login Page{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default OTPVerifiedSuccess;
