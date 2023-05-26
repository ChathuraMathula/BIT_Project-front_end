import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";
import HomeButton from "../UI/buttons/HomeButton";

const Header = (props) => {
  const navigate = useNavigate();

  const onClickHomeButton = (event) => {
    navigate("/", { replace: true });
  };

  return (
    <nav className="main-header">
      <HomeButton onClick={onClickHomeButton} />
      <HeaderOptions />
    </nav>
  );
};

export default Header;
