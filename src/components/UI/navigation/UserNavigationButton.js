import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../context/Context";
import useLocalStorage from "../../../hooks/useLocalStorage";
import "./UserNavigationButton.css";

/**
 * Renders a navigation dropdown expand and close button
 */
const UserNavigationButton = (props) => {
  const login = useContext(UserLoginContext);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (props.user) {
      const formData = new FormData();
      formData.append("username", props.user.name);

      fetch("http://localhost:3001/users/user/profile/picture", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.blob())
        .then((data) => {
          if (data) {
            setFileUrl(URL.createObjectURL(data));
          }
        });
    }
  }, []);

  return (
    <>
      <div
        className="user-navigation-button__container"
        onClick={props.onClick}
      >
        <div>{login.user.name}</div>
        <img
          src={fileUrl}
          alt=""
        ></img>
      </div>
    </>
  );
};

export default UserNavigationButton;
