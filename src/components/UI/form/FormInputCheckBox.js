import React, { useRef, useState } from "react";
import "./FormInputCheckBox.css";

const FormInputCheckBox = (props) => {
  // const [value, setValue] = useState(false);

  let value;

  // set the value and returns a promise if resolved
  // const setCheckValue = async (value) => {
  //   setValue(value);
  //   return value;
  // };

  const onClickHandler = (event) => {
    value = event.target.checked;
    if (typeof props.isChecked === "function") {
      props.isChecked(value); // pass the value to the higher component via a property called value
    }
    // setCheckValue(event.target.checked).then((value) => {
    //   if (typeof props.isChecked === "function") {
    //     props.isChecked(value); // pass the value to the higher component via a property called value
    //   }
    // });
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
