import React, { useEffect, useState } from "react";
import Sanitizer, { sanitize } from "../../../utils/Sanitizer";
import Validator, { isEmpty, isValid } from "../../../utils/Validator";
import "./FormInput.css";

/**
 *
 * @param onChange function to lift up the value taken from the input
 * @param required boolean value to be specified as the input component to be displayed as required if empty
 * @param value input value
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
    </div>
  );
};

export default FormInput;
