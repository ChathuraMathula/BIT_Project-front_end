import React, { useContext, useEffect, useState } from "react";
import "./NotificationCardContainer.css";
import { UserLoginContext } from "../../../context/Context";

/**
 *
 * @param onClick
 * @param children
 * @param reservation
 * @param date
 * @param onStateChange
 * @param rejections
 * @returns
 */
const NotificationCardContainer = (props) => {
  const [state, setState] = useState(null);
  const login = useContext(UserLoginContext);

  useEffect(() => {
    if (login.user?.role === "admin" || login.user?.role === "photographer") {
      if (props.reservation) {
        reservationStateHandler(props.reservation);
      }
    } else if (login.user?.role === "customer") {
      if (
        props.reservation &&
        props.reservation?.customer === login.user?.name
      ) {
        reservationStateHandler(props.reservation);
      } else if (props.rejections) {
        for (let i = props.rejections.length - 1; i >= 0; i--) {
          if (props.rejections[i]?.customer === login.user?.name) {
            setState("rejected");
            break;
          }
        }
        
      }
    }
  }, [props.reservation, props.rejections]);

  const reservationStateHandler = (reservation) => {
    if (reservation) {
      if (reservation.state === "confirmed") {
        setState("confirmed");
      } else if (reservation.state === "pending") {
        if (!reservation.hasOwnProperty("costs")) {
          setState("pending-yellow");
        } else if (
          reservation.hasOwnProperty("costs") &&
          !reservation.hasOwnProperty("payment")
        ) {
          setState("pending-orange");
        } else if (reservation.hasOwnProperty("payment")) {
          setState("pending-red");
        }
      }
    }
  };

  useEffect(() => {
    if (state) {
      props.onStateChange(state);
    }
  }, [state]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <div
        onClick={props.onClick}
        className={`notification-card__container ${
          state === "rejected" ? "rejected" : null
        }`}
      >
        <div className={`notification-card-date__container ${state}`}>
          <div>{`${monthNames[props.date.month]}`}</div>
          <div>{props.date.day}</div>
          <div>{props.date.year}</div>
        </div>
        <div className="notification-card-description__container">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default NotificationCardContainer;
