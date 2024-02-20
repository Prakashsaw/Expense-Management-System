import React, { useEffect } from "react";
import Header1 from "./Header1";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Home.css";

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
                {/* Join us in the exciting world of programming and turn your ideas
                into reality. Unlock the world of endless possibilities - learn
                to code and shape the digital future with us. */}
                Welcone to the{" "}
                <span className="app-name">Expense management System App</span>.
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
              <img
                src="https://www.codingnepalweb.com/demos/create-responsive-website-html-css/hero-bg.png"
                alt="hero"
              />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
