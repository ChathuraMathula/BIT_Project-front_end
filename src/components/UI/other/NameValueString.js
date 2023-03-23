import React from "react";
import "./NameValueString.css";

/**
 * 
 * @param name 
 * @param value
 * @returns 
 */
const NameValueString = (props) => {
  return (
    <>
      <div className="name-value-string__container">
        <span>{`${props.name} `}</span>
        {props.value}
      </div>
    </>
  );
};

export default NameValueString;
