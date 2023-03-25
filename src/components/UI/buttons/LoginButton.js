import React from "react";
import "./LoginButton.css";

/**
 * 
 * @param onClick 
 * @param children
 * @returns 
 */
const LoginButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="login-button">
        {props.children}
      </div>
    </>
  );
};

export default LoginButton;
