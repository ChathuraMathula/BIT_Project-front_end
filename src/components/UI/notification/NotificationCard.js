import React, { useContext, useState } from "react";
import NotificationCardContainer from "../containers/NotificationCardContainer";
import { UserLoginContext } from "../../../context/Context";
import NotificationPendingYellow from "./NotificationPendingYellow";
import NotificationPendingOrange from "./NotificationPendingOrange";
import NotificationPendingRed from "./NotificationPendingRed";
import NotificationConfirmed from "./NotificationConfirmed";
import NotificationRejected from "./NotificationRejected";

/**
 * @param date
 * @param reservation
 * @param rejections
 * @param onClickNotification
 * @returns
 */
const NotificationCard = (props) => {
  const [state, setState] = useState(null);
  const login = useContext(UserLoginContext);

  const onStateChangeHandler = (currentState) => {
    setState(currentState);
  };

  const onClickNotificationHandler = (event) => {
    if (login.user?.role === "admin" || login.user?.role === "photographer") {
      props.onClickNotification({
        date: props.date,
        reservation: props.reservation,
        state: state,
      });
    } else if (login.user?.role === "customer") {
      if (state === "rejected") {
        props.onClickNotification({
          date: props.date,
          rejections: props.rejections[0],
          state: state,
        });
      } else {
        props.onClickNotification({
          date: props.date,
          reservation: props.reservation,
          state: state,
        });
      }
    }
  };

  return (
    <>
      <NotificationCardContainer
        reservation={props.reservation ? props.reservation : null}
        rejections={props.rejections ? props.rejections : null}
        date={props.date}
        onStateChange={onStateChangeHandler}
        onClick={onClickNotificationHandler}
      >
        {state === "pending-yellow" ? (
          <>
            <NotificationPendingYellow />
          </>
        ) : state === "pending-orange" ? (
          <>
            <NotificationPendingOrange reservation={props.reservation} />
          </>
        ) : state === "pending-red" ? (
          <>
            <NotificationPendingRed />
          </>
        ) : state === "confirmed" ? (
          <>
            <NotificationConfirmed />
          </>
        ) : state === "rejected" ? (
          <>
            <NotificationRejected />
          </>
        ) : null}
      </NotificationCardContainer>
    </>
  );
};

export default NotificationCard;
