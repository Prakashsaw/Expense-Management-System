import { LoadingOutlined, LockOutlined, PhoneFilled } from "@ant-design/icons";
import { Alert, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../OTPEmailVerification/OTPVerificationForm.css";
import { BASE_URL } from "../../utils/baseURL";
import axios from "axios";
import { getResponseError } from "../../utils/getResponseError";

const SendOTPAndVerifyPhone = () => {
  const [loading, setLoading] = useState(false);
  const [sendingOTPError, setSendingOTPError] = useState(null);
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();

  const submitHandlerForSendOTP = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/v1/users/send-phone-otp`,
        values
      );
      setResponse(res.data);
      setLoading(false);
      setSendingOTPError(null);
      message.success("OTP sent successfully on your email address...!");
    } catch (error) {
      setResponse([]);
      setLoading(false);
      setSendingOTPError(getResponseError(error));
      message.error("Something went wrong in sending OTP...!");
      console.log(error);
    }
  };

  const submitHandlerForVerifyOTP = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/v1/users/verify-phone-otp`, values);
      setLoading(false);
      setResponse([]);
      setSendingOTPError(null);
      message.success("OTP verified successfully...!");
      setResponse(false);
      navigate("/otp-verified-success");
    } catch (error) {
      setLoading(false);
      setResponse([]);
      setSendingOTPError(getResponseError(error));
      message.error("Something went wrong in verifying OTP...!");
      console.log(error);
    }
  };

  const handleClick = () => {
    // set response to empty array
    setResponse([]);
  };

  return (
    <>
      <div className="send-otp-content mt-5 layout">
        <div className="otp-verification-page ">
          {/* {loading && <Spinner />} */}
          <div className="col-md-5 otp-verification-form">
            {response && response.phoneNumber ? (
              <Form
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={submitHandlerForVerifyOTP}
                autoComplete="off"
              >
                <h3>Verify OTP?</h3>
                <p>Please enter OTP which you will received on your phone.</p>

                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number...!",
                    },
                  ]}
                  value={response.phoneNumber}
                >
                  <Input
                    prefix={<PhoneFilled />}
                    className="pass-input"
                    type="number"
                    placeholder="Phone Number"
                    style={{
                      height: 40,
                    }}
                    disabled={true}
                  />
                </Form.Item>

                <Form.Item
                  label="OTP"
                  name="otp"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your OTP...!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    className="pass-input"
                    type="number"
                    placeholder="OTP"
                    style={{
                      height: 40,
                    }}
                  />
                </Form.Item>
                {sendingOTPError && (
                  <Alert
                    message={sendingOTPError}
                    type="error"
                    showIcon
                    style={{ marginBottom: 15 }}
                  />
                )}

                <div className="loading-text pb-2 mt-2 d-flex justify-content-center">
                  <button className="btn" disabled={loading}>
                    {loading ? <LoadingOutlined /> : "Submit OTP"}
                  </button>
                </div>
                <div
                  className="text pt-2 d-flex justify-content-center"
                  onClick={handleClick}
                >
                  Resend OTP?
                  <Link to="/email-verification-otp">click here!</Link>
                </div>
              </Form>
            ) : (
              <Form
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={submitHandlerForSendOTP}
                autoComplete="off"
              >
                <h3>Send OTP?</h3>
                <p>
                  Please enter your phone number. You will receive a OTP to
                  verify your phone.
                </p>

                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number...!",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneFilled />}
                    className="pass-input"
                    type="number"
                    placeholder="Phone Number"
                    style={{
                      height: 40,
                    }}
                  />
                </Form.Item>

                {sendingOTPError && (
                  <Alert
                    message={sendingOTPError}
                    type="error"
                    showIcon
                    style={{ marginBottom: 15 }}
                  />
                )}

                <div className="loading-text pb-2 mt-2 d-flex justify-content-center">
                  <button className="btn" disabled={loading}>
                    {loading ? <LoadingOutlined /> : "Send OTP"}
                  </button>
                </div>
                <div className="text pt-2 d-flex justify-content-center">
                  <Link to="/login">Login here!</Link>
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SendOTPAndVerifyPhone;
