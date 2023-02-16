import React from "react";
import "./FormInput.css";

const FormInput = (props) => {
  return (
    <div className={"form-input__container " + props.className}>
      <label for={props.id}>{props.children}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default FormInput;
