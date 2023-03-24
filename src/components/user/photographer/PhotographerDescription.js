import React from "react";
import "./PhotographerDescription.css";

/**
 *
 * @param description
 * @returns
 */
const PhotographerDescription = (props) => {
  return <div className="photographer-description">{`"${props.description}"`}</div>;
};

export default PhotographerDescription;
