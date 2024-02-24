import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  DownOutlined,
  EditOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Dropdown, message } from "antd";
import "../../styles/HeaderStyles.css";
import logo from "../../../src/Images/logo.png";
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/");
  };

  const items = [
    {
      label: <Link to="/user/user-profile">My Profile</Link>,
      key: "1",
      icon: <UserOutlined />,
      link: "/login",
    },
    {
      label: <Link to="/user/change-password">Change Password</Link>,
      key: "2",
      icon: <EditOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="btn btn-danger"
          style={{ paddingTop: "2px", paddingBottom: "2px" }}
          onClick={logoutHandler}
        >
          Logout
        </button>
      ),
      key: "3",
      icon: <PoweroffOutlined />,
    },
  ];
  const menuProps = {
    items,
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark sticky-top">
        <Link className="navbar-brand" to="/user">
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
            <span className="navbar-toggler-icon align-end" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarToggleExternalContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-link user-home-btn">
                <Link to="/user">Home</Link>
              </li>
              <li className="nav-item">
                {" "}
                <h6 className="nav-link ">
                  <Dropdown.Button
                    menu={menuProps}
                    placement="bottom"
                    // icon={<UserOutlined />}
                    icon={<DownOutlined />}
                  >
                    {loginUser && loginUser.name}
                  </Dropdown.Button>
                </h6>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
