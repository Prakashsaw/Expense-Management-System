import React, { useEffect } from "react";
import HomeHeader from "./HomeHeader";
import { useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();
  //prevent for loggedIn user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/user");
    }
  }, [navigate]);
  return (
    <>
      <HomeHeader />
      <div className="content container mt-4 layout">
        Home Page Content before login/signup user show here...
      </div>
    </>
  );
};

export default HomeLayout;
