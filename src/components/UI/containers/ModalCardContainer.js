import React from "react";
import "./ModalCardContainer.css";

const ModalCardContainer = props => {
    return <div className="modal-card__container">{props.children}</div>
}

export default ModalCardContainer;