import React from "react";
import "./ListContainer.css";

const ListContainer = (props) => {
  return (
    <div className="list-container__container">
      <ul>{props.children}</ul>
    </div>
  );
};

export default ListContainer;
