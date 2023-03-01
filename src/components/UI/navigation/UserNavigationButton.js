import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../context/Context";
import useLocalStorage from "../../../hooks/useLocalStorage";
import "./UserNavigationButton.css";

/**
 * Renders a navigation dropdown expand and close button
 */
const UserNavigationButton = (props) => {
  const login = useContext(UserLoginContext);
  // const [login, setLogin] = useLocalStorage("login");

  console.log("inside user navigation button", login);
  return (
    <>
      <div
        className="user-navigation-button__container"
        onClick={props.onClick}
      >
        <div>{login.user.name}</div>
        <img
          src="http://localhost:3001/users/user/profile/picture/"
          alt=""
        ></img>
      </div>
    </>
  );
};

export default UserNavigationButton;
