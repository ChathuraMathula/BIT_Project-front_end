import React from "react";
import "./YellowButton.css";

/**
 *
 * @param onClick
 * @param children
 * @returns
 */
const YellowButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="yellow-button">
        {props.children}
      </div>
    </>
  );
};

export default YellowButton;
