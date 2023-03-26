import React from "react";
import PlusSVG from "../SVG/PlusSVG";
import "./PlusButton.css";

/**
 *
 * @param onClick
 * @param name
 * @returns
 */
const PlusButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="plus-button">
        <div>
          <PlusSVG />
        </div>
        <div>{props.name}</div>
      </div>
    </>
  );
};

export default PlusButton;
