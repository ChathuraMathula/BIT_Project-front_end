import React from "react";
import FlexCenterColumnContainer from "../containers/FlexCenterColumnContainer";
import "./DisplayCount.css";

/**
 *
 * @param count
 * @param name
 * @returns
 */
const DisplayCount = (props) => {
  return (
    <div  className="display-count__main-container">
      <FlexCenterColumnContainer>
        <div className="display-count__container">{props.count}</div>
        <div className="display-count__name">{props.name}</div>
      </FlexCenterColumnContainer>
    </div>
  );
};

export default DisplayCount;
