import React, { useState, useEffect } from "react";
import { Form, Input, message, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Loginpage.css";
import { getResponseError } from "../utils/getResponseError";
import { BASE_URL } from "../utils/baseURL";
import { LoadingOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Footer from "../components/Layout/Footer";
import Header1 from "../components/Layout/Header1";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      // If email is not in correct format, show error message
      if (!values.email.includes("@") || !values.email.includes(".")) {
        setLoginError(
          "Please enter a valid email address. Include '@' and ' . '"
        );
        return;
      }

      setLoading(true);

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/users/login`,
        values
      );
      setLoading(false);
      message.success("login success");
      console.log("user", JSON.stringify({ ...data.user }));
      localStorage.setItem("user", JSON.stringify({ ...data.user }));
      navigate("/user");
    } catch (error) {
      setLoading(false);

      setLoginError(getResponseError(error));

      message.error("Something went wrong");
    }
  };

  const handleClickLoginWithGoogle = async () => {
    alert(
      "Working on Login with Google Authentication. Soon this feature will be available."
    );
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/user");
    }
  }, [navigate]);
  return (
    <>
      <Header1 />
      <div className="login-content  mt-4 layout">
        <div className="login-page">
          <div className="col-md-5 login-form">
            <Form
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={submitHandler}
              autoComplete="off"
            >
              <h2 className="header-name">Login</h2>

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
                  type="text"
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

              <div className="text">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="button pb-0 mt-0 d-flex justify-content-center">
                <button className="btn" disabled={loading}>
                  {loading ? <LoadingOutlined /> : "Login"}
                </button>
              </div>
              <div className="pt-2 d-flex justify-content-center">
                <div className="text">
                  Not a user? <Link to="/register">SignUp!</Link>
                </div>
              </div>
              <div className="line"></div>
            </Form>
            <button
              className="login-with-google-btn"
              onClick={handleClickLoginWithGoogle}
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
