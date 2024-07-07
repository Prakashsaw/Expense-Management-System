import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/baseURL";
import { getResponseError } from "../../utils/getResponseError";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Alert, Button } from "antd";
import "./EmailVerification.css";

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [emailVerifyError, setEmailVerifyError] = useState(null);
  const [validUrl, setValidUrl] = useState(false);

  const params = useParams();
  const { expenseAppUserId, token } = params;

  // console.log("expenseAppUserId", expenseAppUserId);
  // console.log("token", token);

  const navigate = useNavigate();

  const onClickHandler = async () => {
    navigate("/login");
  };

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const data = await axios.post(
          `${BASE_URL}/api/v1/users/verify-email/${expenseAppUserId}/${token}`
        );
        console.log(data);
        setLoading(false);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setEmailVerifyError(getResponseError(error));
      }
    };
    verifyEmail();
  }, [expenseAppUserId, token, navigate]);

  return (
    <>
      <div className="content container mt-4 layout">
        <div className="email-verify-page ">
          {loading && <Spinner />}
          {validUrl && (
            <Alert
              message="Email Verified"
              description="Your email has been verified successfully. Go to login page and login with your credentials."
              type="success"
              showIcon
              style={{
                margin: 50,
                marginLeft: 200,
                marginRight: 200,
                padding: 50,
                borderRadius: 10,
                backgroundColor: "#f6ffed",
              }}
            />
          )}
          {emailVerifyError && (
            <Alert
              message={emailVerifyError}
              description="Go to login page and try again for email verification link."
              type="error"
              showIcon
              style={{
                margin: 50,
                marginLeft: 200,
                marginRight: 200,
                padding: 50,
                borderRadius: 10,
                backgroundColor: "#f6ffed",
              }}
            />
          )}
          <Button
            type="primary"
            style={{
              marginLeft: 0,
              borderRadius: 3,
            }}
            onClick={onClickHandler}
          >
            Back to Login Page{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
