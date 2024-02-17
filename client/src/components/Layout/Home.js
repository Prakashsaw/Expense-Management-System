import React, { useEffect } from "react";
import Header1 from "./Header1";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/user");
    }
  }, [navigate]);
  return (
    <>
      <Header1 />
      <div className="content container mt-4 layout">
        Home Page content goes here...
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default Home;
