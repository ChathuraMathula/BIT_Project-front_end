import React, { useState } from "react";
import "./FormInputCheckBox.css";

const FormInputCheckBox = (props) => {

  return (
    <div className={"form-input-checkbox__container " + props.className}>
      <label for={props.id}>{props.children}</label>
      <input className={"form-input-checkbox__" + props.accentColor}
        type="checkbox"
        id={props.id}
        value={props.value}
        name={props.name}
      />
    </div>
  );
};

export default FormInputCheckBox;
