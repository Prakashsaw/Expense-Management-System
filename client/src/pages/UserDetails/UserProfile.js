import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import "./UserProfile.css";
import Footer from "../../components/Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { getResponseError } from "../../utils/getResponseError";
import { Alert, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";
import { LoadingOutlined } from "@ant-design/icons";
import Spinner from "../../components/Spinner";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthDate: "",
    favouriteSport: "",
  });

  const [loading, setLoading] = useState(false);
  const [userUpdateError, setUserUpdateError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/v1/users/logged-user`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        );
        setLoading(false);
        console.log("req.user : ", response.data.user);
        setUserData(response.data.user);
        message.success("User profile details fetched Successfully.", {
          position: "top",
          marginTop: "50px",
        });
      } catch (error) {
        setLoading(false);
        setUserUpdateError(getResponseError(error));
        message.error(
          "Something went in fetching user details. Please try again.",
          { position: "top", marginTop: "50px" }
        );
      }
    };
    fetchUserDetails();
  }, []);

  console.log("UserData: ", userData);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("user"));

    try {
      setUserUpdateError(null);
      setLoading(true);
      await axios.post(
        `${BASE_URL}/api/v1/users/update-user-profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setLoading(false);
      message.success(
        "User Profile Updated Successfully. You are redirecting to user home page."
      );
      // update the local storage with this updated name only
      const user = JSON.parse(localStorage.getItem("user"));
      user.name = userData.name;
      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        navigate("/user");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setUserUpdateError(getResponseError(error));
      console.log(error);
      message.error(
        "Something went wrong in updating user profile. Please try again."
      );
    }
  };

  return (
    <>
      <Header />
      <div className="mt-2">
        <div className="profile-container">
          <div className="change-profile-container">
            {loading && <Spinner />}
            <div className="title">Update User Profile</div>
            <div className="content">
              <form onSubmit={handleFormSubmit}>
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Full Name</span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      placeholder="Enter your name"
                      autoComplete="off"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Email</span>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={userData.email}
                      placeholder="Enter your email"
                      autoComplete="off"
                      required
                      onChange={handleChange}
                      disabled={true}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Phone Number</span>
                    <input
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      placeholder="Enter your number"
                      autoComplete="off"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Address</span>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={userData.address}
                      placeholder="Enter your username"
                      autoComplete="off"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Birth Date</span>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={userData.birthDate}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Favourite Sport</span>
                    <input
                      type="text"
                      id="favouriteSport"
                      name="favouriteSport"
                      value={userData.favouriteSport}
                      placeholder="Enter your favourite sport"
                      autoComplete="off"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="gender-details">
                  <input type="radio" name="gender" id="dot-1" defaultChecked />
                  <input type="radio" name="gender" id="dot-2" />
                  <input type="radio" name="gender" id="dot-3" />
                  <span className="gender-title">Gender</span>
                  <div className="category">
                    <label htmlFor="dot-1">
                      <span className="dot one" />
                      <span className="gender">Male</span>
                    </label>
                    <label htmlFor="dot-2">
                      <span className="dot two" />
                      <span className="gender">Female</span>
                    </label>
                    <label htmlFor="dot-3">
                      <span className="dot three" />
                      <span className="gender">Prefer not to say</span>
                    </label>
                  </div>
                </div>
                <div className="alert-box">
                  {userUpdateError && (
                    <Alert
                      message={userUpdateError}
                      type="error"
                      showIcon
                      style={{ marginBottom: 10 }}
                    />
                  )}
                </div>
                <div className="button pb-0 mt-0 d-flex justify-content-center">
                  <button
                    className="btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <LoadingOutlined /> : "Update Profile"}
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="text">
                    Don't want to update ? <Link to="/user">Home</Link>
                  </div>
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

export default UserProfile;
