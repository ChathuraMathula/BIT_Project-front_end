import React from "react";
import { Link } from "react-router-dom";
import "./SolidButton.css";

const SolidButton = (props) => {
  const buttonClickHandler = props.onClick;

  return (
    <>
      <Link
        className={"solid-button " + props.className}
        onClick={buttonClickHandler}
        to={props.url}
      >
        {props.children}
      </Link>
    </>
  );
};

export default SolidButton;
