import React from "react";
import './Label.css';

const Label = (props) => {
  return (
    <>
      <label className="label-tag" {...props}>{props.children}</label>
    </>
  );
};

export default Label;
