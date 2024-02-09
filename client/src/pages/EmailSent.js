import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmailSent = () => {
  const navigate = useNavigate();

  const onClickHandler = async () => {
    navigate("/login");
  };
  return (
    <>
      <div className="forgot-password-page ">
        <div className="container">
          <div className="col-md-5 forgot-password-form">
            <h3>Check your email</h3>
            <p>
              An email has been sent to your email with the reset link to reset
              your password.
            </p>
          </div>
          <div className="email-sent-page">
            <Button type="primary" onClick={onClickHandler}>
              Back to Login Page{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSent;
