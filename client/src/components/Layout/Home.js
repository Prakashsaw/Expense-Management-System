import React, { useEffect } from "react";
import Header1 from "./Header1";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Home.css";
import homepageImg from "../../../src/Images/homepage-img.png";

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
      <div className="mt-0">
        <div className="home">
          <section className="hero-section">
            <div className="hero">
              <h2>Welcome to Expense Management System</h2>
              <p>
                Welcone to the{" "}
                <span className="app-name">Expense management System </span>App.
                This app helps you to manage your expenses and income. You can
                track your expenses and income, add new expenses and income,
                update and delete expenses and income. You can also see the
                statistics of your expenses and income. Visualize your expenses
                in a chart and graph. By using this app, you can manage your
                expenses and income and save your money from unwanted expenses.
              </p>
              <div className="buttons">
                <Link to="/login" className="join">
                  Join Now
                </Link>

                <Link to="/about-us" className="learn">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="img">
              <img src={homepageImg} alt="homepage-img" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
