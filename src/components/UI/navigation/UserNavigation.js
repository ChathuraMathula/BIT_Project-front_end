import React, { useState } from "react";
import "./UserNavigation.css";
import UserNavigationButton from "./UserNavigationButton";
import { Link, useNavigate } from "react-router-dom";

const UserNavigation = (props) => {
  const [userNavListDropdown, setUserNavListDropdown] = useState(
    "user-navigation-list__container-display-none"
  );

  const navigate = useNavigate();

  const onClickDropDownHandler = (event) => {
    if (
      userNavListDropdown === "user-navigation-list__container-display-none"
    ) {
      setUserNavListDropdown("user-navigation-list__container");
    } else {
      setUserNavListDropdown("user-navigation-list__container-display-none");
    }
  };

  const onlogOutHandler = async () => {
    await fetch("http://localhost:3001/logout", {
      method: "POST",
      body: { logout: true },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        navigate("/", { replace: true });
        window.location.reload();
      }
    });
  };

  return (
    <>
      <UserNavigationButton onClick={onClickDropDownHandler} />
      <nav className={userNavListDropdown}>
        {props.children}
        <Link className="log-out__button" onClick={onlogOutHandler}>
          Log Out
        </Link>
      </nav>
    </>
  );
};

export default UserNavigation;
