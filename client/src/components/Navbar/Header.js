import React, { useState } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";

const Header = () => {
  const [clicked, isClicked] = useState(false);
  return (
    <>
      <Navbar clicked={clicked} isClicked={isClicked} />
      {clicked ? <Menu /> : null}
      <div className="content container mt-4 layout">
        Home Page Content before login/signup user show here...
      </div>
    </>
  );
};

export default Header;
