import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import Footer from "../components/Layout/Footer";
import Header1 from "../components/Layout/Header1";

const PageNotFound = () => {
  const navigate = useNavigate();

  const onClickHandler = async () => {
    navigate("/login");
  };

  return (
    <>
      <Header1 />
      <div className="page-not-found">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={onClickHandler}>
              Back to Login Page{" "}
            </Button>
          }
        />
        <Footer />
      </div>
    </>
  );
};
export default PageNotFound;
