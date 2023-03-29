import React, { useState } from "react";
import Sanitizer, { sanitize } from "../../../utils/Sanitizer";
import Validator, { isEmpty, isValid } from "../../../utils/Validator";
import "./FormInput.css";

/**
 *
 * @param onChange function to lift up the value taken from the input
 * @param required boolean value to be specified as the input component to be displayed as required if empty
 * @param value input value
 * @param placeholder placeholder value to be displayed
 * @param id
 * @param type string of input type
 * @param className string
 * @param name string
 * @param initialValue string to be displayed initially
 * @param disabled boolean
 * @param warining string
 * @returns
 */
const FormInput = (props) => {
  
  // const [warningMsg, setWariningMsg] = useState("");
  // const [warningStyles, setWariningStyles] = useState("");

  // const setWarining = (message) => {
  //   setWariningMsg(message);
  //   setWariningStyles("form-input__warining-red");
  //   setTimeout(() => {
  //     setWariningMsg("");
  //     setWariningStyles("");
  //   }, 5000);
  // };

  return (
    <div className={"form-input__container " + props.className}>
      <label for={props.id}>
        {props.children}
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </label>
      <div className={"form-input__warining"}>{props.warning}</div>
    </div>
  );
};

export default FormInput;
