import React from "react";
import NotificationCard from "./NotificationCard";

/**
 *
 * @param date
 * @param reservation
 * @param onClickNotification
 * @returns
 */
const NotificationAdminCard = (props) => {
  const onClickNotificationCardHandler = (notificationData) => {
    props.onClickNotification(notificationData);
  };

  return (
    <>
      <NotificationCard
        date={props.date}
        reservation={props.reservation}
        onClickNotification={onClickNotificationCardHandler}
      />
    </>
  );
};

export default NotificationAdminCard;
