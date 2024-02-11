import React, { useState, useEffect } from "react";
import { Form, Input, message, Alert, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterPage.css";
import { getResponseError } from "../utils/getResponseError";
import { BASE_URL } from "../utils/baseURL";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const Register = () => {
  const img =
    "https://images.unsplash.com/photo-1593538312308-d4c29d8dc7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/v1/users/register`, values);
      setLoading(false);
      message.success("Registration Successfull");
      setResponseMessage(
        "Successfully Registered. Please check your email for email verification link."
      );
      setRegisterError(null);
      setTimeout(() => {
        navigate("/signup-success");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setResponseMessage(null);
      setRegisterError(getResponseError(error));
      message.error("Something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="register-page">
        <div className="row container">
          <h1>Expense Management System</h1>
          <div className="col-md-6">
            <img src={img} alt="register-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-5 register-form">
            <Form
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={submitHandler}
              autoComplete="off"
            >
              <h2>Sign Up</h2>

              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name...!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  className="pass-input"
                  type="text"
                  placeholder="Please enter your name"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your valid eamil...!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  className="pass-input"
                  type="email"
                  placeholder="Enter your valid email address"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password must be a strong password...!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  className="pass-input"
                  type="password"
                  placeholder="Please enter your password"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>
                  I agree to the{" "}
                  <Link className="link link1" to="/terms-conditions">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link className="link link1" to="/privacy-policy">
                    Privacy policy
                  </Link>
                  .
                </Checkbox>
              </Form.Item>

              {registerError && (
                <Alert
                  message={registerError}
                  type="error"
                  showIcon
                  style={{ marginTop: 10 }}
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

              <div className="pb-0 mt-0 d-flex justify-content-center">
                <button className="btn" disabled={loading}>
                  {loading ? "Registering you in..." : "Sign Up"}
                </button>
              </div>
              <div className="text pt-2 d-flex justify-content-center">
                Already Registered?
                <Link className="link" to="/login">
                  Login here!
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
