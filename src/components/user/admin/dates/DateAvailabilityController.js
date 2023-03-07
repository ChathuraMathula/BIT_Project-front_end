import React, { useState } from "react";
import ToggleButton from "../../../UI/buttons/ToggleButton";
import "./DateAvailabilityController.css";

/**
 * 
 * @param onChecked (function) handler for check event
 * @param checked (boolean) check state of the toggle button
 * @returns 
 */
const DateAvailabilityController = (props) => {
    return (
        <>
        <div className="date-availability-controller__container">
            <div className="date-availability-controller__state">State</div>
            <div className="date-availability-controller-button__container">
                <div className="date-availability-controller-button__title">Set Available</div>
                <ToggleButton onChange={props.onChecked} checked={props.checked}/>
            </div>
        </div>
        </>
    );
};

export default DateAvailabilityController;
