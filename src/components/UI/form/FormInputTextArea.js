import React from "react";
import "./FormInputTextArea.css";

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
 * @param disabled boolean
 * @param rows Specifies the visible number of lines in a text area
 * @param cols Specifies the visible width of a text area
 * @param maxLength Specifies the maximum number of characters allowed in the text area
 * @returns
 */
const FormInputTextArea = (props) => {
  return (
    <div className={"form-input-text-area__container " + props.className}>
      <label htmlFor={props.id}>{props.children}</label>
      <textarea
        type={props.type}
        id={props.id}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        disabled={props.disabled}
        rows={props.rows}
        cols={props.cols}
        maxLength={props.maxLength}
      ></textarea>
      {props.warning ? <div className={"form-input__warining"}>{props.warning}</div> : null}
    </div>
  );
};

export default FormInputTextArea;
