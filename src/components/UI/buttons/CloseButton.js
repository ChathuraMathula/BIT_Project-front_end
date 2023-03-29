import React from "react";
import CrossSVG from "../SVG/CrossSVG";
import "./CloseButton.css";

const CloseButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="close-button">
        <CrossSVG />
      </div>
    </>
  );
};

export default CloseButton;
