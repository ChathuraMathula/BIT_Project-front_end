import React from "react";
import CalenderDateState from "../../UI/calender/CalenderDateState";
import ModalCardContainer from "../../UI/containers/ModalCardContainer";
import "./PendingConfirmation.css";
import EventDetails from "./EventDetaills";
import CustomerDetails from "./CustomerDetails";
import PackageDetails from "./PackageDetails";
import CostDetails from "./CostDetails";
import PaymentDetails from "./PaymentDetails";

/**
 * 
 * @param reservation 
 * @returns 
 */
const PendingConfirmation = (props) => {
  return (
    <>
      <CalenderDateState>Pending Confirmation</CalenderDateState>
      <ModalCardContainer>
        <div className="pending-reservation-confirmation-notice">
          Please wait... 😊 Your photographer will respond soon.
        </div>
      </ModalCardContainer>
      <ModalCardContainer>
        <EventDetails reservation={props.reservation} />
      </ModalCardContainer>
      <ModalCardContainer>
        <PackageDetails reservation={props.reservation} />
      </ModalCardContainer>
      <ModalCardContainer>
        <CostDetails reservation={props.reservation} />
      </ModalCardContainer>
      <ModalCardContainer>
        <PaymentDetails reservation={props.reservation} />
      </ModalCardContainer>
    </>
  );
};

export default PendingConfirmation;
