import React from "react";
import "./OrangeButton.css";

/**
 * 
 * @param onClick 
 * @param children
 * @returns 
 */
const OrangeButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="orange-button">
        {props.children}
      </div>
    </>
  );
};

export default OrangeButton;
