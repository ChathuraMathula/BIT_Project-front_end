import React from "react";
import "./CalenderDateContainer.css";

const CalenderDateContainer = (props) => {
  return <div className="calender-date__container">{props.children}</div>
};

export default CalenderDateContainer;
