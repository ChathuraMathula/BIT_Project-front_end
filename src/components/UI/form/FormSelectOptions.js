import React from "react";
import "./FormSelectOptions.css";

/**
 * 
 * @param id
 * @param label  
 * @param onChange
 * @returns 
 */
const FormSelectOptions = (props) => {
  return (
    <div className={"form-select-options__container " + props.className}>
      <label for={props.id}>{props.label}</label>
      <select id={props.id} name={props.id} onChange={props.onChange}>
        {props.children}
      </select>
    </div>
  );
};

export default FormSelectOptions;
