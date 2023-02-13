import React from "react";
import "./SolidButton.css";

const SolidButton = props => {

    const buttonClickHandler = props.onClick;

    return (
        <>
            <button className="solid-button" onClick={buttonClickHandler}>
                {props.children}
            </button>
        </>
    );
};

export default SolidButton;