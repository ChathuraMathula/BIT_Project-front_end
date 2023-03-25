import React from "react";
import "./NavDropdownBtn.css";
import NavigationSVG from "./SVG/NavigationSVG";

const NavDropdownBtn = (props) => {

  const onClickHandler = props.onClick;

  return (
    <>
      <div className={"nav-dropdown__btn " + props.className} onClick={onClickHandler}>
        <NavigationSVG />
      </div>
    </>
  );
};

export default NavDropdownBtn;
