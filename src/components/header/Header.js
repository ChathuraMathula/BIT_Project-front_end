import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";

const Header = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(props.user);

  return (
    <nav className="main-header">
      <Link className="main-header__title" to="/">
        ABC Photography
      </Link>

      <HeaderOptions isLogged={props.isLogged} />
    </nav>
  );
};

export default Header;
