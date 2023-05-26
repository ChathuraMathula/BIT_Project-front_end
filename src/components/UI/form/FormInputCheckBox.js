import React from "react";
import "./FormInputCheckBox.css";

/**
 * 
 * @param onClick event handler function (event.target.checked)
 * @param className string
 * @param id string
 * @param children string to be displayed as a label
 * @param accentColor   red | green | (default) blue
 * @param name string
 * @returns 
 */
const FormInputCheckBox = (props) => {

  return (
    <div className={"form-input-checkbox__container " + props.className}>
      <label htmlFor={props.id}>{props.children}</label>
      <input
        className={"form-input-checkbox__" + props.accentColor}
        type="checkbox"
        id={props.id}
        value={props.value}
        name={props.name}
        onClick={props.onClick}
      />
    </div>
  );
};

export default FormInputCheckBox;
