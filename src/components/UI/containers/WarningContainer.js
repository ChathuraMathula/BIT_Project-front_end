import React from "react";
import "./WarningContainer.css";

/**
 * 
 * @param children 
 * @returns 
 */
const WarningContainer = (props) => {
  return <div className="warning__container">{props.children}</div>;
};

export default WarningContainer;