import React from "react";
import "./CalenderDate.css";

/**
 * 
 * @param {object} onClickDate (function) handler to handle click event of the date 
 * @returns 
 */
const CalenderDate = (props) => {
  const onClickDateHandler = (event) => {
    props.onClickDate(props.date);
  };

  return (
    <div
      className={
        props.date.disabled
          ? "calender-date-object__disabled"
          : props.date.today
          ? "calender-date-object__today"
          : "calender-date__object"
      }
      onClick={onClickDateHandler}
    >
      {props.date.date.getDate()}
    </div>
  );
};

export default CalenderDate;
