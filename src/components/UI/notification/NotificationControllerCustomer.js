import React from "react";
import ReservationRequestController from "../../user/admin/reservation/ReservationRequestController";
import ConfirmedReservation from "../../user/admin/reservation/ConfirmedReservation";
import CustomerPaymentDetails from "../../user/customer/CustomerPaymentDetails";
import PendingPhotographerCosts from "../../user/customer/PendingPhotographerCosts";
import PendingConfirmation from "../../user/customer/PendingConfirmation";

/**
 *
 * @param state
 * @param date
 * @param reservation
 * @param onSuccess
 * @returns
 */
const NotificationControllerCustomer = (props) => {
  return (
    <>
      {props.state === "pending-yellow" ? <PendingPhotographerCosts /> : null}
      {props.state === "pending-orange" ? (
        <CustomerPaymentDetails
          date={props.date}
          onSuccess={props.onSuccess}
          reservation={props.reservation}
        />
      ) : null}
      {props.state === "pending-red" ? <PendingConfirmation /> : null}
      {props.state === "confirmed" ? (
        <ConfirmedReservation
          reservation={props.reservation}
          date={props.date}
          onSuccess={props.onSuccess}
        />
      ) : null}
    </>
  );
};

export default NotificationControllerCustomer;
