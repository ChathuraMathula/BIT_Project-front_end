import React, { useContext, useEffect } from "react";
import { UserLoginContext } from "../../../context/Context";
import "./UserNavigationButton.css";

const UserNavigationButton = (props) => {
    const login = useContext(UserLoginContext);

    useEffect(() => {
        fetch("http://localhost:3001/");
    });

  return (
    <>
      <div className="user-navigation-button__container" onClick={props.onClick} >
        <div>{login.user.name}</div>
        <img alt=""></img>
      </div>
    </>
  );
};

export default UserNavigationButton;
