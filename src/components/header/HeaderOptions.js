import React, { useState } from "react";
import "./HeaderOptions.css";
import { Link } from "react-router-dom";
import NavDropdownBtn from "../UI/NavDropdownBtn";

/*
    This component renders the Option links in Main Header based on the login state and user
*/

const HeaderOptions = (props) => {

    const [isNavNotExpanded, setIsNavNotExpanded] = useState(true);

  // if user is not logged to the system
  if (!props.isLogged) {
    return (
      <nav className="header-options__container">
        <div className={isNavNotExpanded? "header-options__list nav-not-expanded":"header-options__list"}>
          <Link className="header-options__link" to="tel:0701234567">
            Call Me
          </Link>
          <Link className="header-options__link" to="/sign-up">
            Sign Up
          </Link>
          <Link className="header-options__link" to="/login">
            Login
          </Link>
        </div>
        <NavDropdownBtn onClick={() => {
            setIsNavNotExpanded(!isNavNotExpanded);
        }}/>
      </nav>
    );
  }
};

export default HeaderOptions;
