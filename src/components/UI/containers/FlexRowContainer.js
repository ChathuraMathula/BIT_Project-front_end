import React from "react";
import "./FlexRowContainer.css";

const FlexRowContainer = props => {
    return <div className="flex-row__container">{props.children}</div>
}

export default FlexRowContainer;