import React, { useEffect, useRef, useState } from "react";
import "./UserNavigation.css";
import UserNavigationButton from "./UserNavigationButton";
import { Link, useNavigate } from "react-router-dom";

const UserNavigation = (props) => {
  const [userNavListDropdown, setUserNavListDropdown] = useState(
    "user-navigation-list__container-display-none"
  );

  const dropdownList = useRef(null);

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
      body: JSON.stringify({ logout: true }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      if (res.ok) {
        window.location.replace("/");
      }
    });
  };

  return (
    <>
      <UserNavigationButton onClick={onClickDropDownHandler} />
      <nav ref={dropdownList} className={userNavListDropdown}>
        {props.children}
        <Link className="log-out__button" onClick={onlogOutHandler}>
          Log Out
        </Link>
      </nav>
    </>
  );
};

export default UserNavigation;
