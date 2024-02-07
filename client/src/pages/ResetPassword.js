import React from "react";
import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "../styles/ForgotPassword.css";

const ResetPassword = () => {
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
              <h2>Set new password</h2>
              <p>Please enter your new password below.</p>

              <Form.Item
                label="New Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password here...!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  className="pass-input"
                  type="password"
                  placeholder="Password"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter confirm password...!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  className="pass-input"
                  type="password"
                  placeholder="Confirm password"
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
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
