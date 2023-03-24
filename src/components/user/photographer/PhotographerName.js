import React from "react";
import "./PhotographerName.css";

/**
 *
 * @param firstname
 * @param lastname
 * @returns
 */
const PhotographerName = (props) => {
  return (
    <div className="photographer-name">{`${props.firstname.toUpperCase()} ${props.lastname.toUpperCase()}`}</div>
  );
};

export default PhotographerName;
