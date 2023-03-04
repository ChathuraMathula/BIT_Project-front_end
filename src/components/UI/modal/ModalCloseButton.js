import React from "react";
import "./ModalCloseButton.css";

const ModalCloseButton = (props) => {
    return (
        <>
        <div onClick={props.onClick} className="modal-close-button">✖</div>
        </>
    );
};

export default ModalCloseButton;