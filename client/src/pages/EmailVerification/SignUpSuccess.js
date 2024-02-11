import { Alert, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpSuccess = () => {
  const navigate = useNavigate();

  const onClickHandler = async () => {
    navigate("/login");
  };
  return (
    <>
      <div>
        <Alert
          message="Successfully Registered."
          description="You successfully registered to Expense Management System. Please check your email for email verification link and verify your email."
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
            marginLeft: 550,
            borderRadius: 3,
          }}
          onClick={onClickHandler}
        >
          Back to Login Page{" "}
        </Button>
      </div>
    </>
  );
};

export default SignUpSuccess;
