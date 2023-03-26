import React from "react";
import PlusSVG from "../SVG/PlusSVG";
import "./MiniPlusButton.css";

/**
 *
 * @param onClick
 * @param name
 * @returns
 */
const MiniPlusButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="mini-plus-button">
        <div>
          <PlusSVG />
        </div>
        <div>{props.name}</div>
      </div>
    </>
  );
};

export default MiniPlusButton;
