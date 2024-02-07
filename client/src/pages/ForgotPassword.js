import React from "react";
import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <>
      <div className="forgot-password-page ">
        <div className="container align-item-center">
          <div className="col-md-5 forgot-password-form">
            <Form
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              style={{
                maxWidth: 600,
              }}
              //   onFinish={submitHandler}
              autoComplete="off"
            >
              <h2>Forgot password?</h2>
              <p>
                Please enter your email address. You will receive a link to
                create a new password via email.
                {/* Enter your email address to receive a password reset link. */}
              </p>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your valid email...!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  className="pass-input"
                  type="email"
                  placeholder="Email"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              {/* {loginError && (
                <Alert
                  message={loginError}
                  type="error"
                  showIcon
                  style={{ marginBottom: 10 }}
                />
              )} */}

              <div className="loading-text pb-2 mt-4 d-flex justify-content-center">
                <button className="btn">Reset Password</button>
              </div>
              <div className="text pt-2 d-flex justify-content-center">
                Remember your password?
                <Link to="/login">Login here!</Link>
              </div>
              <div className="text pt-2 d-flex justify-content-center">
                Go to reset page form? 
                <Link to="/reset-password">Click here!</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
