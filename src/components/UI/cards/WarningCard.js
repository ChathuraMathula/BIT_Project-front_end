import React from "react";
import ModalCardContainer from "../containers/ModalCardContainer";
import WarningContainer from "../containers/WarningContainer";
import "./WarningCard.css";

/**
 *
 * @param warning warning message string
 * @returns
 */
const WarningCard = (props) => {
  return (
    <>
        <WarningContainer>
          <h2 className="warning-card__title">WARNING...! ⚠</h2>
          <div className="warning-card__warning-message">{props.warning}</div>
        </WarningContainer>
    </>
  );
};

export default WarningCard;
