import React from "react";
import NotificationCard from "./NotificationCard";

/**
 *
 * @param date
 * @param reservation
 * @param onClick
 * @param rejections
 * @param onClickNotification
 * @returns
 */
const NotificationCustomerCard = (props) => {
  const onClickNotificationCardHandler = (notificationData) => {
    props.onClickNotification(notificationData);
  };

  return (
    <>
      <NotificationCard
        date={props.date}
        reservation={props.reservation ? props.reservation : null}
        rejections={props.rejections ? props.rejections : null}
        onClickNotification={onClickNotificationCardHandler}
      />
    </>
  );
};

export default NotificationCustomerCard;
