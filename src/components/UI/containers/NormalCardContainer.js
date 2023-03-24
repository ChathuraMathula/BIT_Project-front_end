import React from "react";
import "./NormalCardContainer.css";

const NormalCardContainer = props => {
    return <div className="normal-card__container">{props.children}</div>
}

export default NormalCardContainer;