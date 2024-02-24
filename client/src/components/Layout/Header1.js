import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "../../styles/HomeHeader.css";
import logo from "../../../src/Images/logo.png";

const Header1 = () => {
  const navigate = useNavigate();
  //prevent for loggedIn user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/user");
    }
  }, [navigate]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark sticky-top">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" />
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
            <span className="navbar-toggler-icon align-right" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarToggleExternalContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-link user-home-btn ">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                {" "}
                <h6 className="nav-link ">
                  <Button className=" nav-item login-btn">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="nav-item register-btn">
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </h6>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header1;
