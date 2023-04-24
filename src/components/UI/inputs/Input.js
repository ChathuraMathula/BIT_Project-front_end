import React from "react";
import './Input.css';

const Input = (props) => {
  return (
    <>
      <input className="input-tag" {...props} />
    </>
  );
};

export default Input;
