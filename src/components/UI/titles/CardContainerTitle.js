import React from "react";
import "./CardContainerTitle.css";

const CardContainerTitle = (props) => {
  return (
    <div className="card-container-title__container">
      <h1>{props.children}</h1>
    </div>
  );
};

export default CardContainerTitle;
