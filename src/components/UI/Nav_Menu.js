import React from "react";
import "./Nav_Menu.css";

const Nav_Menu = (props) => {
  return (
    <>
      <div className={"nav-menu__btn " + props.className}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="nav-menu__dropdown">

      </div>
    </>
  );
};

export default Nav_Menu;
