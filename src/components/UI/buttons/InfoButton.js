import React from "react";
import "./InfoButton.css";

/**
 *
 * @param onClick
 * @param className
 * @returns
 */
const InfoButton = (props) => {
  return (
    <div className={"info-button " + props.className} onClick={props.onClick}>
      i
    </div>
  );
};

export default InfoButton;
