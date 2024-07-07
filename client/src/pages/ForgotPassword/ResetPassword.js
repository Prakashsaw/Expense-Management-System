import React, { useState } from "react";
import { Alert, Form, Input, message } from "antd";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import "./ForgotPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { getResponseError } from "../../utils/getResponseError";
import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";
import Spinner from "../../components/Spinner";
import Header1 from "../../components/Layout/Header1";
import Footer from "../../components/Layout/Footer";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { expenseAppUserId, token } = params;

  const submitHandler = async (values) => {
    try {
      if (values.password.length < 8) {
        setResetPasswordError("Password must be atleast 8 characters long...!");
        return;
      }
      if (values.password !== values.confirmPassword) {
        setResetPasswordError(
          "Password and confirm password should be same...!"
        );
        return;
      }

      setLoading(true);
      await axios.post(
        `${BASE_URL}/api/v1/users/reset-password/${expenseAppUserId}/${token}`,
        values
      );
      setLoading(false);
      message.success("Password reset Successfully...");
      navigate("/password-reset-success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setResetPasswordError(getResponseError(error));
      message.error("Something went wrong in sending reset password email...!");
    }
  };

  return (
    <>
      <Header1 />
      <div className="forgot-password-content mt-4 layout">
        <div className="forgot-password-page ">
          {loading && <Spinner />}
          <div className="col-md-5 forgot-password-form">
            <Form
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={submitHandler}
              autoComplete="off"
            >
              <h3>Reset Password</h3>
              <p>
                Please enter your new password below.<br></br> Fields marked
                with (*) are required.
              </p>

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
                  placeholder="New Password"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Re-enter Your New Password"
                name="confirmPassword"
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
                  placeholder="Re-enter New password"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              {resetPasswordError && (
                <Alert
                  message={resetPasswordError}
                  type="error"
                  showIcon
                  style={{ marginBottom: 10 }}
                />
              )}

              <div className="loading-text pb-2 mt-4 d-flex justify-content-center">
                <button className="btn" disabled={loading}>
                  {loading ? <LoadingOutlined /> : "Reset Password"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
