import React from "react";
import "./ScrollableContainer.css";

/**
 *
 * @param children
 * @param className
 * @returns
 */
const ScrollableContainer = (props) => {
  return (
    <div className={"scrollable__container " + props.className}>
      {props.children}
    </div>
  );
};

export default ScrollableContainer;
