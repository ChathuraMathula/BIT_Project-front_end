import React from "react";
import { Link } from "react-router-dom";
import "./FormActionButton.css";

const FormActionButton = (props) => {
  return (
    <Link
      className={"form-action-button " + props.className}
      to={props.to}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
};

export default FormActionButton;