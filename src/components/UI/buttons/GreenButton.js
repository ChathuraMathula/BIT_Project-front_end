import React from "react";
import "./GreenButton.css";

/**
 * 
 * @param onClick 
 * @param children
 * @returns 
 */
const GreenButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="green-button">
        {props.children}
      </div>
    </>
  );
};

export default GreenButton;
