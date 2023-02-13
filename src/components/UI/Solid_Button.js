import React from "react";
import "./Solid_Button.css";

const Solid_Button = props => {

    const buttonClickHandler = props.onClick;

    return (
        <>
            <button className="solid-button" onClick={buttonClickHandler}>
                {props.children}
            </button>
        </>
    );
};

export default Solid_Button;