import React from "react";
import PlusSVG from "../SVG/PlusSVG";
import "./IncreaseButton.css";

/**
 *
 * @param onClick
 * @returns
 */
const IncreaseButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="increase-button">
        <PlusSVG />
      </div>
    </>
  );
};

export default IncreaseButton;
