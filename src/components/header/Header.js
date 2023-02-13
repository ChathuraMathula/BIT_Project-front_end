import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";

const Header = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(props.user);

  if (isLogged && user) {
    if (user === "admin") {
      return <>Logged in as admin</>;
    } else if (user === "photographer") {
      return <>Logged in as photographer</>;
    } else {
      return <>Logged in as customer</>;
    }
  }

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
