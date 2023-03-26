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
        {props.name ? <div>{props.name}</div> : null}
      </div>
    </>
  );
};

export default PlusButton;
