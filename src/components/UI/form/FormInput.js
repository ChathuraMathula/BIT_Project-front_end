<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> version02
import Sanitizer, { sanitize } from "../../../utils/Sanitizer";
import Validator, { isEmpty, isValid } from "../../../utils/Validator";
import "./FormInput.css";

/**
 *
<<<<<<< HEAD
 * @param value function to lift up the value taken from the input
=======
 * @param onChange function to lift up the value taken from the input
>>>>>>> version02
 * @param required boolean value to be specified as the input component to be displayed as required if empty
 * @param value input value
 * @param placeholder placeholder value to be displayed
 * @param id
 * @param type string of input type
 * @param className string
 * @param name string
<<<<<<< HEAD
 * @param initialValue string to be displayed initially
=======
>>>>>>> version02
 * @param disabled boolean
 * @param warining string
 * @returns
 */
const FormInput = (props) => {
<<<<<<< HEAD
  // const [warningMsg, setWariningMsg] = useState("");
  // const [warningStyles, setWariningStyles] = useState("");

<<<<<<< HEAD
  const inputValue = {};

  const setInputValue = async (value) => {
    // setValue(Sanitizer.sanitize(value));
    setValue(sanitize(value));
    return value;
  };

  const onChangeValueHandler = (event) => {

    setInputValue(event.target.value).then((value) => {
      if (props.required === true && Validator.isEmpty(value)) {
        // if the input value is empty and input is required
        setPlaceholderStyles("form-input__required ");
        setPlaceholder("⚠ Required");
      } else if (!Validator.isValid(props.validateType, value)) {
        // if the input value is not a valid value
        setNotValidStyles("form-input__not-valid ");
      } else {
        setNotValidStyles("");
        setPlaceholderStyles("");
        setPlaceholder("");
      }

      if (Validator.isValid(props.validateType, value)) {
        // if the value is a valid one

        inputValue[props.name] = value;

        if (typeof props.value === "function") {
          props.value(inputValue); // pass the value to the higher component via a property called value
        }
      }
    });
  };
=======
  // const setWarining = (message) => {
  //   setWariningMsg(message);
  //   setWariningStyles("form-input__warining-red");
  //   setTimeout(() => {
  //     setWariningMsg("");
  //     setWariningStyles("");
  //   }, 5000);
  // };
>>>>>>> version02

=======
>>>>>>> version03
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
