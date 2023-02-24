import React, { useState } from "react";
import Sanitizer from "../../../utils/Sanitizer";
import Validator from "../../../utils/Validator";
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
 * @returns 
 */
const FormInput = (props) => {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState(props.placeholder);
  const [placeholderStyles, setPlaceholderStyles] = useState("");
  const [notValidStyles, setNotValidStyles] = useState("");

  const inputValue = {};

  const setInputValue = async (value) => {
    setValue(Sanitizer.sanitize(value));
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
      />
    </div>
  );
};

export default FormInput;
