import React from "react";
import "./InputWarning.css";

/**
 * 
 * @param message warning message to be displayed 
 * @returns 
 */
const InputWarning = (props) => {
  return (
    <>
      <div className="input-warning">{props.message}</div>
    </>
  );
};

export default InputWarning;
