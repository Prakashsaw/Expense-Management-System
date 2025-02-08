import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer bg-dark text-light p-3">
        <h4 className="text-center">
          All rights reserved &copy; 2024 Prakash & Company Pvt Ltd.
        </h4>
        <p className="text-center mt-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://prakashsawportfolio.netlify.app/"
          >
            About
          </a>
          |<Link to="/contact-us">Contact</Link>|
          <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
