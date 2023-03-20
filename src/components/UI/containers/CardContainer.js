import React from "react";
import "./CardContainer.css";

const CardContainer = props => {
    return <div className="card__container">{props.children}</div>
}

export default CardContainer;