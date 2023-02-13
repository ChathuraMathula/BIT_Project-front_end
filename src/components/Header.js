import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Nav_Menu from "./UI/Nav_Menu";

import Solid_Button from "./UI/Solid_Button";

const Header = () => {
  return (
    <nav className="main-header">
      <Link className="main-header__title" to="/">
        ABC Photography
      </Link>

      <div className="main-header__options">
        <a className="main-header__option" href="tel:0702765139">
          Call Me
        </a>
        <Link to="/sign-up" className="main-header__option">
          Sign Up
        </Link>
        <Link to="/login" className="main-header__option">
          <Solid_Button>Login</Solid_Button>
        </Link>
        <Nav_Menu className="main-header__nav-menu-btn" />
      </div>
    </nav>
  );
};

export default Header;
