import React from "react";
import NotificationAdminCard from "./NotificationAdminCard";

/**
 *
 * @param dates Array of date documents
 * @param onClickNotification
 * @returns
 */
const NotificationAdmin = (props) => {
  const onClickNotificationHandler = (notificattionData) => {
    props.onClickNotification(notificattionData);
  };

  return (
    <>
      {props.dates.length > 0
        ? props.dates.map((dateDocument, index) => {
            const year = dateDocument.date.year;
            const month = dateDocument.date.month;
            const day = dateDocument.date.day;
            return (
              <>
                <NotificationAdminCard
                  key={`${year}${month}${day}`}
                  date={dateDocument.date}
                  reservation={dateDocument.reservation}
                  onClickNotification={onClickNotificationHandler}
                />
              </>
            );
          })
        : null}
    </>
  );
};

export default NotificationAdmin;
