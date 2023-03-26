//RoundedCardContainer.css
import React from "react";
import "./RoundedCardContainer.css";

const RoundedCardContainer = props => {
    return <div className="rounded-card__container">{props.children}</div>
}

export default RoundedCardContainer;