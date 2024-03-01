import React, { useState } from "react";
import "./ContactUs.css";
import Footer from "../../components/Layout/Footer";
import Header1 from "../../components/Layout/Header1";
import { Alert, message } from "antd";
import { getResponseError } from "../../utils/getResponseError";
import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";
import {
  HomeOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageSendingError, setMessageSendingError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setResponseMessage(null);
      console.log("formData: ", formData);
      // validate form data
      if (!formData.name || !formData.email || !formData.message) {
        setMessageSendingError("All fields are required.");
        return;
      }
      // validate email format
      if (
        !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          formData.email
        )
      ) {
        setMessageSendingError("Invalid email. Please enter valid email.");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/v1/user-information/contact-us`,
        formData
      );
      setLoading(false);
      setMessageSendingError(null);
      console.log("response.data:", response.data);
      setResponseMessage(
        "Message sent successfully. We will reach out to you soon."
      );
      message.success(
        "Message sent successfully. We will reach out to you soon."
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setResponseMessage(null);
      setMessageSendingError(getResponseError(error));
      console.log(error);
      message.error(
        "Something went wrong in sending message. Please try again."
      );
    }
  };

  return (
    <>
      <Header1 />
      <div className="about mt-4">
        <div className="about-container">
          <div className="about-content">
            <div className="left-side">
              <div className="address details">
                <div className="icons">
                  <HomeOutlined />
                </div>
                <div className="topic">Address</div>
                <div className="text-one">Daltonganj, Palamu</div>
                <div className="text-two">Jharkhand, 822126.</div>
              </div>
              <div className="phone details">
                <div className="icons">
                  <PhoneOutlined />
                </div>
                <div className="topic">Phone</div>
                <div className="text-one">+91 8873323323</div>
                <div className="text-two">+91 8873323323</div>
              </div>
              <div className="email details">
                <div className="icons">
                  <MailOutlined />
                </div>
                <div className="topic">Email</div>
                <div className="text-one">
                  <a href="mailto:prakash8873saw@gmail.com">
                    prakash8873saw@gmail.com
                  </a>
                </div>
                <div className="text-two">
                  <a href="mailto:info.prakash.company@gmail.com">
                    info.prakash.company@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="right-side">
              <div className="topic-text">Send Us Message</div>
              <p>
                If you have any work from me or any types of quries related to
                this application, Expense Management System, you can send me
                message. It's my pleasure to help you and reach out to you.
              </p>
              <form onSubmit={handleFormSubmit}>
                <div className="input-box">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box message-box">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?..."
                    defaultValue={""}
                    onChange={handleChange}
                  />
                </div>

                {messageSendingError && (
                  <Alert
                    message={messageSendingError}
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
                    style={{ marginBottom: 10 }}
                  />
                )}
                <div className="button pb-0 mt-0 d-flex justify-content-center">
                  <button className="btn" type="submit" disabled={loading}>
                    {loading ? <LoadingOutlined /> : "Send Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
