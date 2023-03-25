import React from "react";
import "./CounterContainer.css";

const CounterContainer = (props) => {
  return <div className="counter__container">{props.children}</div>;
};

export default CounterContainer;
