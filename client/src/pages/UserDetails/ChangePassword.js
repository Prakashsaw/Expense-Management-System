import React, { useState } from "react";
import { Form, Input, message, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import "./ChangePassword.css";
import Header from "../../components/Layout/Header";
import { getResponseError } from "../../utils/getResponseError";
import { BASE_URL } from "../../utils/baseURL";
import Footer from "../../components/Layout/Footer";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    // console.log("values : ",values);
    try {
      if (values.newPassword.length < 8) {
        setPasswordChangeError(
          "Password must be atleast 8 characters long...!"
        );
        return;
      }
      if (values.newPassword !== values.confirmPassword) {
        setPasswordChangeError(
          "Password and confirm password should be same...!"
        );
        return;
      }
      if (values.newPassword === values.oldPassword) {
        setPasswordChangeError(
          "New password should be different from old password...!"
        );
        return;
      }

      setLoading(true);
      await axios.post(`${BASE_URL}/api/v1/users/change-password`, values, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      setLoading(false);
      setPasswordChangeError(null);
      message.success(
        "Password changed successfully. Redirecting to the login page. Login with new password."
      );
      setResponseMessage(
        "Password changed successfully. Redirecting to the login page. Login with new password."
      );
      // first clear the local storage
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setResponseMessage(null);
      setPasswordChangeError(getResponseError(error));
      console.log(error);
      message.error("Something went wrong in changing password...!");
    }
  };

  return (
    <>
      <Header />
      <div className="password-change-content  mt-4 layout">
        <div className="password-change-page">
          <div className="col-md-5 password-change-form">
            <Form
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={submitHandler}
              autoComplete="off"
            >
              <h2 className="header-name">Change Password ?</h2>

              <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your correct old password...!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  className="pass-input"
                  type="password"
                  placeholder="Enter your old password"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message:
                      " Password must be a strong password which includes atleast one capital letter, small letters and numbers...!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  className="pass-input"
                  type="password"
                  placeholder="Create your new password"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Re-Enter Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Enter confirm password ",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  className="pass-input"
                  type="password"
                  placeholder="Re enter your new password"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>

              {passwordChangeError && (
                <Alert
                  message={passwordChangeError}
                  type="error"
                  showIcon
                  style={{ marginBottom: 10 }}
                />
              )}
              {responseMessage && (
                <Alert
                  message={responseMessage}
                  type="success"
                  showIcon
                  style={{ marginTop: 10 }}
                />
              )}
              <div className="button pb-0 mt-0 d-flex justify-content-center">
                <button className="btn" disabled={loading}>
                  {loading ? <LoadingOutlined /> : "Submit"}
                </button>
              </div>
              <div className="pt-2 d-flex justify-content-center">
                <div className="text">
                  Don't want to change? <Link to="/user">Home</Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
