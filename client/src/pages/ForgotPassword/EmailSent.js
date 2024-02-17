import { Alert, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
const EmailSent = () => {
  const navigate = useNavigate();

  const onClickHandler = async () => {
    navigate("/login");
  };
  return (
    <>
      <div className="content container mt-4 layout">
        <div className="forgot-password-page ">
          <Alert
            message="Email sent. Check your mail."
            description="An email has been sent to your email with the reset link to reset your password."
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

export default EmailSent;
