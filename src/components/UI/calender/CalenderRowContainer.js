import React from "react";
import "./CalenderRowContainer.css";

const CalenderRowContainer = (props) => {
  return <div className="calender-row__container">{props.children}</div>
};

export default CalenderRowContainer;
