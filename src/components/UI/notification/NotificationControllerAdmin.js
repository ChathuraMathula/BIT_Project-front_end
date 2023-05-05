import React from "react";
import ReservationRequestController from "../../user/admin/reservation/ReservationRequestController";
import ConfirmedReservation from "../../user/admin/reservation/ConfirmedReservation";

/**
 * 
 * @param state
 * @param date
 * @param reservation
 * @param onSuccess 
 * @returns 
 */
const NotificationControllerAdmin = (props) => {
  return (
    <>
      {props.state === "pending-yellow" ||
      props.state === "pending-orange" ||
      props.state === "pending-red" ? (
        <ReservationRequestController
          reservation={props.reservation}
          date={props.date}
          onSuccess={props.onSuccess}
        />
      ) : null}
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

export default NotificationControllerAdmin;
