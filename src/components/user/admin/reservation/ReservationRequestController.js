import React from "react";
import NewReservationRequest from "./NewReservationRequest";
import ReservationConfirmation from "./ReservationConfirmation";
import "./ReservationRequestController.css";
import WaitingCustomerPaymentDetails from "./WaitingCustomerPaymentDetails";

/**
 *
 * @param reservation (object) reservation document
 * @param date (object) date document
 * @param onSuccess handler function for success
 * @returns
 */
const ReservationRequestController = (props) => {
  if (!props.reservation.hasOwnProperty("costs")) {
    return (
      <NewReservationRequest
        reservation={props.reservation}
        date={props.date}
        onSuccess={props.onSuccess}
      />
    );
  } else if (!props.reservation.hasOwnProperty("payment")) {
    return <WaitingCustomerPaymentDetails reservation={props.reservation} />;
  } else if (props.reservation.hasOwnProperty("payment")) {
    return (
      <ReservationConfirmation
        reservation={props.reservation}
        date={props.date}
        onSuccess={props.onSuccess}
      />
    );
  }
};

export default ReservationRequestController;
