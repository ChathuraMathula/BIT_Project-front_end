import React from "react";
import { Link } from "react-router-dom";
import "./FormActionButton.css";

/**
 *
 * @param onClick on-click handler function
 * @param to navigation path eg: "/users"
 * @param className class name to the tag
 * @returns Action button as an anchor tag either to handle on-click event with a function or navigate to a path
 */
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
