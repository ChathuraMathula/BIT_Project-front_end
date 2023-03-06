import React from "react";
import "./CalenderDate.css";

const CalenderDate = (props) => {

    const onClickDateHandler = (event) => {
        console.log(props.date);
    }

  return (
    <div className="calender-date__object" onClick={onClickDateHandler}>
      {props.date.getDate()}
    </div>
  );
};

export default CalenderDate;
