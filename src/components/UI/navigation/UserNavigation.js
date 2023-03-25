import React, { useContext, useEffect, useRef, useState } from "react";
import "./UserNavigation.css";
import UserNavigationButton from "./UserNavigationButton";
import { Link } from "react-router-dom";
import { UserLoginContext } from "../../../context/Context";
import { CSSTransition } from "react-transition-group";
import NavigationDropdownButton from "../buttons/NavigationDropdownButton";
import LogoutButton from "../buttons/LogoutButton";

/**
 *
 * @param show (boolean) show dropdown nav
 * @returns
 */
const UserNavigation = (props) => {
  const login = useContext(UserLoginContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownList = useRef(null);
  const navigationButton = useRef(null);

  const animationTiming = {
    enter: 500,
    exit: 500,
  };

  const onClickDropDownHandler = (event) => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };


  useEffect(() => {
    document.addEventListener("click", outsideClickHandler, true);
  }, []);

  const outsideClickHandler = (e) => {
    if (dropdownList.current && navigationButton.current) {
      if (
        !dropdownList.current.contains(e.target) &&
        !navigationButton.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
  };

  return (
    <>
      {login.isLogged ? (
        <UserNavigationButton
          ref={navigationButton}
          user={login.user}
          onClick={onClickDropDownHandler}
        />
      ) : (
        <NavigationDropdownButton
          ref={navigationButton}
          onClick={onClickDropDownHandler}
        />
      )}
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
        <nav ref={dropdownList} className="user-navigation-list__container">
          {props.children}
          {login.isLogged ? (
            <LogoutButton>Log Out</LogoutButton>
          ) : null}
        </nav>
      </CSSTransition>
    </>
  );
};

export default UserNavigation;
