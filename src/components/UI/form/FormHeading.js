import React from "react";
import "./FormHeading.css";

const FormHeading = (props) => {
  return (
    <>
        <h1 className="form-heading">{props.children}</h1>
    </>
  );
};

export default FormHeading;