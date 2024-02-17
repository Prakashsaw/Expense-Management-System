import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/HomeHeader.css";

const HomeHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark sticky-top">
        <Link className="navbar-brand" to="/">
          Expense Management System
        </Link>
        <div className="container-fluid">
          <button
            className="responsive-btn navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div
              className="collapse navbar-collapse"
              id="navbarToggleExternalContent"
            >
              <span className="navbar-toggler-icon " />

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-link">
                  <Button className="home-btn">
                    <Link to="/">Home</Link>
                  </Button>
                </li>
                <li className="nav-link">
                  <Button className="login-btn">
                    <Link to="/login">Login</Link>
                  </Button>
                </li>
                <li className="nav-link">
                  <Button className="register-btn">
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </nav>
    </>
  );
};

export default HomeHeader;
