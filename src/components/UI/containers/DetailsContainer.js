import React from "react";
import "./DetailsContainer.css";

/**
 * 
 * @param children 
 * @returns 
 */
const DetailsContainer = (props) => {
  return <div className="details__container">{props.children}</div>;
};

export default DetailsContainer;