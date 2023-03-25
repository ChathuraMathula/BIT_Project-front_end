import React, { useState } from "react";
import GreenButton from "../../../UI/buttons/GreenButton";
import ToggleButton from "../../../UI/buttons/ToggleButton";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import FlexCenterRowContainer from "../../../UI/containers/FlexCenterRowContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import "./DateAvailabilityController.css";

/**
 *
 * @param onChecked (function) handler for check event
 * @param checked (boolean) check state of the toggle button
 * @param state (string) (Reserved | Available | Not Available)
 * @returns
 */
const DateAvailabilityController = (props) => {
  return (
    <>
      <CalenderDateState>{props.state}</CalenderDateState>
      <ModalCardContainer>
        <FlexCenterRowContainer>
          <div className="date-availability-controller-button__title">
            Set Available
          </div>
          <ToggleButton onChange={props.onChecked} checked={props.checked} />
        </FlexCenterRowContainer>
      </ModalCardContainer>
    </>
  );
};

export default DateAvailabilityController;
