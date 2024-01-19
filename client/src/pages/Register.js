import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";
const Register = () => {
  const img =
    "https://images.unsplash.com/photo-1593538312308-d4c29d8dc7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/users/register`,
        values
      );
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
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
        {loading && <Spinner />}
        <div className="row container">
          <h1>Expense Management System</h1>
          <div className="col-md-6">
            <img src={img} alt="register-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-4 register-form">
            <Form layout="vertical" onFinish={submitHandler}>
              <h2>Register</h2>

              <Form.Item label="Name" name="name">
                <Input type="text" placeholder="Enter your name" required />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input
                  type="email"
                  placeholder="Enter your valid email address"
                  required
                />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input
                  type="password"
                  placeholder="Password must be strong "
                  required
                />
              </Form.Item>
              <div className="pb-2 d-flex justify-content-center">
                <button className="btn ">Resgiter</button>
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
