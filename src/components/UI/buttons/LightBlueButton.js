import React from "react";
import "./LightBlueButton.css";

/**
 *
 * @param onClick
 * @param children
 * @returns
 */
const LightBlueButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="lightblue-button">
        {props.children}
      </div>
    </>
  );
};

export default LightBlueButton;
