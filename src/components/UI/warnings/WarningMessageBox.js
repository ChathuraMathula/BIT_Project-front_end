import React from "react";
import "./WarningMessageBox.css";

/**
 * 
 * @param message 
 * @returns 
 */
const WarningMessageBox = (props) => {

  return (
    <>
      <div className="warning-message-box__container">{props.message}</div>
    </>
  );
};

export default WarningMessageBox;
