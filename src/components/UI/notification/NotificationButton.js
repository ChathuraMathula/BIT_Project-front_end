import React from "react";
import "./NotificationButton.css";
import BellSVG from "../SVG/BellSVG";

/**
 * @param onClick
 */
const NotificationButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="notification-button__container">
        <div className="notification-button__display-counter">15</div>
        <BellSVG />
      </div>
    </>
  );
};

export default NotificationButton;
