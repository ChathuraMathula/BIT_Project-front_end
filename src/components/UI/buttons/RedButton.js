import React from "react";
import "./RedButton.css";

/**
 * 
 * @param onClick 
 * @param children
 * @returns 
 */
const RedButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="red-button">
        {props.children}
      </div>
    </>
  );
};

export default RedButton;
