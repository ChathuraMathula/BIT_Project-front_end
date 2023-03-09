import React, { useState } from "react";
import "./FormInputTime.css";

/**
 * @param hours number (0 - 23)
 * @param minutes number (0 - 59)
 * @param onChangeHours function
 * @param onChangeMinutes function
 */
const FormInputTime = (props) => {
  return (
    <div className="form-input-time__container">
      <label>{props.children}</label>
      <div className="form-input-time__inputs-container">
        <input value={props.hours} onChange={props.onChangeHours} placeholder="HH" type="number" min="0" max="23" />
        <input value={props.minutes} onChange={props.onChangeMinutes} placeholder="MM" type="number" min="0" max="59" />
      </div>
    </div>
  );
};

export default FormInputTime;
