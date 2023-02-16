import React from "react";
import "./FormContainer.css";

const FormContainer = (props) => {
  return (
    <form className={"form-container " + props.className}>
      {props.children}
    </form>
  );
};

export default FormContainer;