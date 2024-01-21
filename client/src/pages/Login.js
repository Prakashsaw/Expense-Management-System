import React, { useState, useEffect } from "react";
import { Form, Input, message, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";
import { getResponseError } from "../utils/getResponseError";

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
        `${process.env.REACT_APP_SERVER_URL}/api/v1/users/login`,
        values
      );
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);

      setLoginError(getResponseError(error));

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
      <div className="login-page ">
        {loading && <Spinner />}
        <div className="row container">
          <h1>Expense Management System</h1>
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
                  type="email"
                  placeholder="Please enter your valid email address"
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
                  className="pass-input"
                  type="password"
                  placeholder="Please enter your password"
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

              <div className="pb-2 mt-4 d-flex justify-content-center">
                <button className="btn">Login</button>
              </div>
              <div className="text pt-2 d-flex justify-content-center">
                Not a user ?<Link to="/register">Regsiter here!</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
