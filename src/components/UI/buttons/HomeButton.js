import React from "react";
import "./HomeButton.css";
import HomeSVG from "../SVG/HomeSVG";

/**
 * @param onClick
 */
const HomeButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="home-button__container">
        <HomeSVG />
      </div>
    </>
  );
};

export default HomeButton;
