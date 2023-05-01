import React from "react";
import "./ScrollableContainer.css";

/**
 * 
 * @param children 
 * @returns 
 */
const ScrollableContainer = props => {
    return <div className="scrollable__container">{props.children}</div>
}

export default ScrollableContainer;