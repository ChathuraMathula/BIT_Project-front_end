import React from "react";
import "./FormHeading.css";

const FormHeading = (props) => {
  return (
    <>
        <h2 className="form-heading">{props.children}</h2>
    </>
  );
};

export default FormHeading;