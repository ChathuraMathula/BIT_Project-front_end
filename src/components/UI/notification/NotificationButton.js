import React from "react";
import "./NotificationButton.css";
import BellSVG from "../SVG/BellSVG";

/**
 * @param onClick
 * @param count number of notifications
 */
const NotificationButton = (props) => {
  return (
    <>
      <div onClick={props.onClick} className="notification-button__container">
        {props.count !== 0 ? (
          <>
            <div className="notification-button__display-counter">
              {props.count}
            </div>
          </>
        ) : null}
        <BellSVG />
      </div>
    </>
  );
};

export default NotificationButton;
