import React from "react";
import "./CustomerRejectedReservation.css";
import CalenderDateState from "../../UI/calender/CalenderDateState";
import WarningCard from "../../UI/cards/WarningCard";
import MessageCard from "../../UI/cards/MessageCard";
import ModalCardContainer from "../../UI/containers/ModalCardContainer";

/**
 *
 * @param rejection Array containing one rejection document eg: {customer: String, message: String}
 * @returns
 */
const CustomerRejectedReservation = (props) => {
  
  return (
    <>
      <CalenderDateState>Rejected</CalenderDateState>
      <WarningCard
        warning={
          "Your reservation has been rejected. Please find the message sent by the photographer."
        }
      />
      <ModalCardContainer>
        <div>Photographer's message: </div>
        <MessageCard message={props.rejection[0].message} />
      </ModalCardContainer>
    </>
  );
};

export default CustomerRejectedReservation;
