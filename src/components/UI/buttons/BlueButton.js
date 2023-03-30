import React from "react";
import "./BlueButton.css";

/**
 * 
 * @param onClick 
 * @param children
 * @returns 
 */
const BlueButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="blue-button">
        {props.children}
      </div>
    </>
  );
};

export default BlueButton;
