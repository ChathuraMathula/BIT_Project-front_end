import React from "react";
import "./CalenderDate.css";

const CalenderDate = (props) => {
  const onClickDateHandler = (event) => {
    console.log(props.date);
  };

  return (
    <div
      className={
        props.date.disabled
          ? "calender-date-object__disabled"
          : "calender-date__object"
      }
      onClick={onClickDateHandler}
    >
      {props.date.date.getDate()}
    </div>
  );
};

export default CalenderDate;
