import React, { useRef, useState } from "react";
import "./FormInputCheckBox.css";

/**
 * 
 * @param isChecked function to return boolean value of the checkbox
 * @param className string
 * @param id string
 * @param children string to be displayed as a label
 * @param accentColor   red | green | (default) blue
 * @param name string
 * @returns 
 */
const FormInputCheckBox = (props) => {
  let value;

  const onClickHandler = (event) => {
    value = event.target.checked;
    props.isChecked(value); // pass the value to the higher component via a property called value
  };

  return (
    <div className={"form-input-checkbox__container " + props.className}>
      <label for={props.id}>{props.children}</label>
      <input
        className={"form-input-checkbox__" + props.accentColor}
        type="checkbox"
        id={props.id}
        value={props.value}
        name={props.name}
        onClick={onClickHandler}
      />
    </div>
  );
};

export default FormInputCheckBox;
