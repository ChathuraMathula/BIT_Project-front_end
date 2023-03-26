
import React from "react";
import MinusSVG from "../SVG/MinusSVG";
import "./ReduceButton.css";

/**
 *
 * @param onClick
 * @returns
 */
const ReduceButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="reduce-button">
        <MinusSVG />
      </div>
    </>
  );
};

export default ReduceButton;
