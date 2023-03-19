import React from "react";
import CalenderDateState from "../../UI/calender/CalenderDateState";
import ModalCardContainer from "../../UI/containers/ModalCardContainer";
import "./PendingConfirmation.css";

const PendingConfirmation = (props) => {
  return (
    <>
      <CalenderDateState>Pending Confirmation</CalenderDateState>
      <ModalCardContainer>
        <div className="pending-reservation-confirmation-notice">
          Please wait... 😊 Your photographer will respond soon.
        </div>
      </ModalCardContainer>
    </>
  );
};

export default PendingConfirmation;
