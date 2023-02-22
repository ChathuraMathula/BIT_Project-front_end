import React, { useState } from "react";
import "./UserNavigation.css";
import UserNavigationButton from "./UserNavigationButton";
import { Link } from "react-router-dom";

const UserNavigation = (props) => {
  const [userNavListDropdown, setUserNavListDropdown] = useState("user-navigation-list__container-display-none");

  const onClickDropDownHandler = (event) => {
    if (userNavListDropdown === "user-navigation-list__container-display-none") {
      setUserNavListDropdown("user-navigation-list__container");
    } else {
      setUserNavListDropdown("user-navigation-list__container-display-none");
    }
  };

  return (
    <>
      <UserNavigationButton onClick={onClickDropDownHandler} />
      <nav
        className={userNavListDropdown}
      >
        {props.children}
        <Link className="log-out__button">Log Out</Link>
      </nav>
    </>
  );
};

export default UserNavigation;
