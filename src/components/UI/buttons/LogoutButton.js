import React, { useContext, useEffect } from "react";
import { UserLoginContext } from "../../../context/Context";
import "./LogoutButton.css";

/**
 *
 * @param children
 * @param to
 * @returns
 */
const LogoutButton = (props) => {
  const login = useContext(UserLoginContext);

  const onLogOutHandler = async () => {
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
      <button onClick={onLogOutHandler} className="logout-button" to={props.to}>
        {props.children}
      </button>
    </>
  );
};

export default LogoutButton;
