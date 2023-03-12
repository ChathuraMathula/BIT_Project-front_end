import React from "react";
import NewReservationRequest from "./NewReservationRequest";
import "./ReservationRequestController.css";

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
    return (
      <div>Payment</div>
    );
  }
};

export default ReservationRequestController;
