import React, { useState } from "react";
import ToggleButton from "../../../UI/buttons/ToggleButton";
import "./DateAvailabilityController.css";

const DateAvailabilityController = (props) => {
    const [checked, setChecked] = useState(false);

    const toggleButtonClickHandler = (event) => {
        setChecked(event.target.checked);
    }
    return (
        <>
        <div>
            <div>State</div>
            <div>
                <div>Set Available</div>
                <ToggleButton onChange={toggleButtonClickHandler} checked={checked}/>
            </div>
        </div>
        </>
    );
};

export default DateAvailabilityController;
