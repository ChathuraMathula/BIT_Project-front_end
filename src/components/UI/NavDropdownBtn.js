import React from "react";
import "./NavDropdownBtn.css";

const NavDropdownBtn = (props) => {

  const onClickHandler = props.onClick;

  return (
    <>
      <div className={"nav-dropdown__btn " + props.className} onClick={onClickHandler}>
        <div className="nav-dropdown__dash"></div>
        <div className="nav-dropdown__dash"></div>
        <div className="nav-dropdown__dash"></div>
      </div>
    </>
  );
};

export default NavDropdownBtn;
