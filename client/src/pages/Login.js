import React, { useState, useEffect } from "react";
import { Form, Input, message, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Loginpage.css";
import { getResponseError } from "../utils/getResponseError";
import { BASE_URL } from "../utils/baseURL";
import { LoadingOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import HomeHeader from "../components/Layout/HomeHeader";
import Footer from "../components/Layout/Footer";

const Login = () => {
  const img =
    "https://images.unsplash.com/photo-1593538312308-d4c29d8dc7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/users/login`,
        values
      );
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/user");
    } catch (error) {
      setLoading(false);

      setLoginError(getResponseError(error));

      message.error("Something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/user");
    }
  }, [navigate]);
  return (
    <>
      <HomeHeader />
      <div className="content container mt-4 layout">
        <div className="login-page ">
          <div className="row container">
            <div className="col-md-6">
              <img src={img} alt="login-img" width={"100%"} height="100%" />
            </div>
            <div className="col-md-5 login-form">
              <Form
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                style={{
                  maxWidth: 600,
                }}
                onFinish={submitHandler}
                autoComplete="off"
              >
                <h2>Login</h2>

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
                    placeholder="Please enter your valid email address"
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
                      message: "Please enter your password...!",
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

                {loginError && (
                  <Alert
                    message={loginError}
                    type="error"
                    showIcon
                    style={{ marginBottom: 10 }}
                  />
                )}

                <div className="loading-text pb-2 mt-4 d-flex justify-content-center">
                  <button className="btn" disabled={loading}>
                    {loading ? <LoadingOutlined /> : "Login"}
                  </button>
                </div>
                <div className="text pt-2 d-flex justify-content-between">
                  <div className="text">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <div className="text">
                    Not a user? <Link to="/register">SignUp here!</Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
