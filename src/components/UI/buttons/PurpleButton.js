import React from "react";
import "./PurpleButton.css";

/**
 * 
 * @param onClick 
 * @param children
 * @returns 
 */
const PurpleButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="purple-button">
        {props.children}
      </div>
    </>
  );
};

export default PurpleButton;
