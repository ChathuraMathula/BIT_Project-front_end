import React, { useEffect, useState } from "react";
import "./WarningMessageBox.css";

/**
 *
 * @param message
 * @returns
 */
const WarningMessageBox = (props) => {
  const [warningStyels, setWarningStyles] = useState("");

  useEffect(() => {
    if (props.message) {
      setWarningStyles("warining-red")
    } else {
      setWarningStyles("");
    }
  }, [props.message]);

  return (
    <>
      <div className={`warning-message-box__container ${warningStyels}`}>
        {props.message}
      </div>
    </>
  );
};

export default WarningMessageBox;
