import React from "react";
import "./ButtonContainer.css";

/**
 * 
 * @param children 
 * @returns 
 */
const ButtonContainer = (props) => {
  return <div className="button__container">{props.children}</div>;
};

export default ButtonContainer;