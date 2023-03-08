import React from "react";
import "./ToggleButton.css";

/**
 * 
 * @param onChange (function) check event handler function
 * @param checked (boolean) value of the button state (true = checked | false = notChecked)
 * @returns 
 */
const ToggleButton = props => {

    return (
        <>
            <label className="toggle-button__label">
                <input onChange={props.onChange} checked={props.checked} type="checkbox" className="toggle-button__input"></input>
                <span className="toggle-button__slider"></span>
            </label>
        </>
    )
}

export default ToggleButton;