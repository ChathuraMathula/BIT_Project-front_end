import React from "react";
import Calender from "./Calender";

/**
 * 
 * @param {object} onClickDate (function) handler to handle click event of the date 
 * @returns 
 */
const DatePicker = (props) => {
  return <Calender onClickDate={props.onClickDate}/>;
};

export default DatePicker;
