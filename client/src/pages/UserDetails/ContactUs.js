import React from "react";
import "./ContactUs.css";
import Footer from "../../components/Layout/Footer";
import Header1 from "../../components/Layout/Header1";
const ContactUs = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Message sent successfully...!");
  };

  return (
    <>
      <Header1 />
      <div className="about mt-4">
        <div className="about-container">
          <div className="about-content">
            <div className="left-side">
              <div className="address details">
                <i className="fas fa-map-marker-alt" />
                <div className="topic">Address</div>
                <div className="text-one">Daltonganj, Palamu</div>
                <div className="text-two">Jharkhand, 822126.</div>
              </div>
              <div className="phone details">
                <i className="fas fa-phone-alt" />
                <div className="topic">Phone</div>
                <div className="text-one">+91 8873323323</div>
                <div className="text-two">+91 8873323323</div>
              </div>
              <div className="email details">
                <i className="fas fa-envelope" />
                <div className="topic">Email</div>
                <div className="text-one">prakash8873saw@gmail.com</div>
                <div className="text-two">info.prakash.company@gmail.com</div>
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
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="input-box message-box">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    required
                    defaultValue={""}
                  />
                </div>
                <div className="button">
                  <input type="submit" defaultValue="Send Now" />
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
