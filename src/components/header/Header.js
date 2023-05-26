import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";

const Header = (props) => {


  return (
    <nav className="main-header">
      <Link className="main-header__title" to="/">
        Reserve4U
      </Link>

      <HeaderOptions />
    </nav>
  );
};

export default Header;
