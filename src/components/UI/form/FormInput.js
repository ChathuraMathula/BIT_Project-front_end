import React, { useState } from "react";
import Sanitizer, { sanitize } from "../../../utils/Sanitizer";
import Validator, { isEmpty, isValid } from "../../../utils/Validator";
import "./FormInput.css";

/**
 *
 * @param value function to lift up the value taken from the input
 * @param required boolean value to be specified as the input component to be displayed as required if empty
 * @param placeholder placeholder value to be displayed
 * @param validateType validation types ( username | password | name | email | phoneNo | address | url_path )
 * @param id
 * @param type string of input type
 * @param className string
 * @param name string
 * @param initialValue string to be displayed initially
 * @param disabled boolean
 * @returns
 */
const FormInput = (props) => {
  const [value, setValue] = useState(props.initialValue);
  const [placeholder, setPlaceholder] = useState(props.placeholder);
  const [placeholderStyles, setPlaceholderStyles] = useState("");
  const [notValidStyles, setNotValidStyles] = useState("");

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

  return (
    <div className={"form-input__container " + props.className}>
      <label for={props.id}>{props.children}</label>
      <input
        className={placeholderStyles + notValidStyles}
        type={props.type}
        id={props.id}
        value={value}
        name={props.name}
        placeholder={placeholder}
        onChange={onChangeValueHandler}
        disabled={props.disabled}
      />
    </div>
  );
};

export default FormInput;
