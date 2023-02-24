import React from "react";
import "./FormContainer.css";

/**
 * 
 * @param className
 * @param children 
 * @returns container to hold form inputs
 */
const FormContainer = (props) => {
  return (
    <form className={"form-container " + props.className}>
      {props.children}
    </form>
  );
};

export default FormContainer;