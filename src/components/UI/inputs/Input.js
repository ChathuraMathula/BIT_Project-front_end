import React, { useEffect, useState } from "react";
import "./Input.css";

const Input = (props) => {
  const [styles, setStyles] = useState("");

  useEffect(() => {
    if (props.invalid) {
      setStyles("input-tag-invalid");
    } else {
      setStyles("");
    }
  }, [props.invalid]);
  return (
    <>
      <input className={"input-tag " + styles} {...props } />
    </>
  );
};

export default Input;
