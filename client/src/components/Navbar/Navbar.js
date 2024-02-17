import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar({ clicked, isClicked }) {
  const handleClicked = () => {
    isClicked(!clicked);
    console.log("clicked");
  };
  return (
    <div className="Nav">
      <ul className="NavbarWrapper">
        <li className="NavLogo">
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Expense Management System
          </Link>
        </li>
        <li
          className="NavElements"
        >
          <NavLink className="Link" to="/home">
            Home
          </NavLink>
        </li>
        <li className="NavButton">
          <NavLink className="Link" to="/sign-up">
            Sign Up
          </NavLink>
        </li>
        <li
          className="NavElements"
          style={{ float: "right", margin: "-8px 2px 1px 2px" }}
        >
          <NavLink className="Link" to="/sign-in">
            Sign In
          </NavLink>
        </li>
      </ul>
      {!clicked ? (
        <GiHamburgerMenu onClick={handleClicked} className="Icon" />
      ) : (
        <ImCross onClick={handleClicked} className="Icon" />
      )}
    </div>
  );
}

export default Navbar;
