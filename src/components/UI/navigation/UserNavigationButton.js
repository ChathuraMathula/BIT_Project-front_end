import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import "./UserNavigationButton.css";

const UserNavigationButton = (props) => {
  const login = useContext(UserLoginContext);
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
