import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/baseURL";
import { getResponseError } from "../../utils/getResponseError";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Alert } from "antd";

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [emailVerifyError, setEmailVerifyError] = useState(null);
  const [validUrl, setValidUrl] = useState(false);

  const params = useParams();
  const { _id, token } = params;

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const data = await axios.post(
          `${BASE_URL}/api/v1/users/verify-email/${_id}/${token}`
        );
        console.log(data);
        setLoading(false);
        setValidUrl(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setEmailVerifyError(getResponseError(error));
      }
    };
    verifyEmail();
  }, [_id, token, navigate]);

  return (
    <>
      <div className="container">
        <div className="col-md-5">
          {loading && <Spinner />}
          {validUrl && (
            <Alert
              message="Email Verified"
              description="Your email has been verified successfully."
              type="success"
              showIcon
              style={{ marginTop: 10 }}
            />
          )}
          {emailVerifyError && (
            <Alert
              message={emailVerifyError}
              description="Please check your email verification link."
              type="error"
              showIcon
              style={{ marginTop: 10 }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
