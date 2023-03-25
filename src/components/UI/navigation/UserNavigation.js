import React, { useContext, useEffect, useRef, useState } from "react";
import "./UserNavigation.css";
import UserNavigationButton from "./UserNavigationButton";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { UserLoginContext } from "../../../context/Context";
import { CSSTransition } from "react-transition-group";

/**
 *
 * @param show (boolean) show dropdown nav
 * @returns
 */
const UserNavigation = (props) => {
  const login = useContext(UserLoginContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const animationTiming = {
    enter: 500,
    exit: 500,
  };

  const [userNavListDropdown, setUserNavListDropdown] = useState(
    "user-navigation-list__container-display-none"
  );

  const dropdownList = useRef(null);

  const navigate = useNavigate();

  const onClickDropDownHandler = (event) => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
    // if (
    //   userNavListDropdown === "user-navigation-list__container-display-none"
    // ) {
    //   setUserNavListDropdown("user-navigation-list__container");
    // } else {
    //   setUserNavListDropdown("user-navigation-list__container-display-none");
    // }
  };

  const onlogOutHandler = async () => {
    if (login.isLogged) {
      await fetch("http://localhost:3001/logout", {
        method: "POST",
        body: { logout: true },
        credentials: "include",
      })
        .then((res) => {
          if (res) {
            localStorage.clear();
            window.location.replace("/");
          }
        })
        .catch((error) => {
          if (error) {
            localStorage.clear();
            window.location.replace("/");
          }
        });
    }
  };

  return (
    <>
      <UserNavigationButton
        user={login.user}
        onClick={onClickDropDownHandler}
      />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showDropdown}
        timeout={animationTiming}
        classNames={{
          enterActive: "DropdownOpen",
          exitActive: "DropdownClose",
        }}
      >
        {/* <nav ref={dropdownList} className={userNavListDropdown}> */}
        <nav className="user-navigation-list__container">
          {props.children}
          <Link className="log-out__button" onClick={onlogOutHandler}>
            Log Out
          </Link>
        </nav>
      </CSSTransition>
    </>
  );
};

export default UserNavigation;
