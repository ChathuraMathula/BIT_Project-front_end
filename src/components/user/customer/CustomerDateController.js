import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../context/Context";
import "./CustomerDateController.css";

const CustomerDateController = (props) => {
  const login = useContext(UserLoginContext);
  const [state, setState] = useState("");

  const thisDay = props.date.date.getDate();
  const thisMonth = props.date.date.getMonth();
  const thisYear = props.date.date.getFullYear();

  useEffect(() => {
    fetch("http://localhost:3001/available/dates")
      .then((res) => res.json())
      .then((dates) => {
        if (dates) {
          const availableDate = dates.filter((dateDocument) => {
            return (
              dateDocument.date.year === thisYear &&
              dateDocument.date.month === thisMonth &&
              dateDocument.date.day === thisDay
            );
          });

          if (availableDate.length > 0) {
            if (availableDate[0].reservation) {
              const reservation = availableDate[0].reservation;
              if (reservation.customer === login.user?.name) {
                if (reservation.state === "confirmed") {
                  setState("confirmedReservation");
                } else if (reservation.state === "pending") {
                  setState("pendingReservation");
                }
              } else {
                setState("Reserved");
              }
            } else {
              setState("Available");
            }
          } else {
            setState("Not Available");
          }
        }
      });
  }, [props.date.date]);

  const onClickDateHandler = (event) => {};

  return (
    <>
      <div
        className={
          props.date.disabled ||
          state === "Not Available" ||
          state === "Reserved"
            ? "customer-date-controller-object__disabled"
            : props.date.today
            ? "customer-date-controller-object__today"
            : state === "confirmedReservation"
            ? "customer-date-controller-object__reservation-confirmed"
            : state === "pendingReservation"
            ? "customer-date-controller-object__reservation-pending"
            : "customer-date-controller__object"
        }
        onClick={onClickDateHandler}
      >
        {props.date.date.getDate()}
      </div>
    </>
  );
};

export default CustomerDateController;
