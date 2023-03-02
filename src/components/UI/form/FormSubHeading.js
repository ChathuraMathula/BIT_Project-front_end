import React from "react";
import "./FormSubHeading.css";

const FormSubHeading = (props) => {
  return <h3 className="form-sub-heading">{props.children}</h3>;
};

export default FormSubHeading;
