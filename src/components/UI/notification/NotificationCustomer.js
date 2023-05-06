import React from "react";
import NotificationCustomerCard from "./NotificationCustomerCard";

/**
 *
 * @param dates Array of date documents
 * @param onClickNotification
 * @returns
 */
const NotificationCustomer = (props) => {
  
  const onClickNotificationHandler = notificattionData => {
    props.onClickNotification(notificattionData);
  }
  return (
    <>
      {props.dates.length > 0
        ? props.dates.map((dateDocument, index) => {
          const year = dateDocument.date.year;
          const month = dateDocument.date.month;
          const day = dateDocument.date.day;
          
            return (
              <>
                <NotificationCustomerCard
                  key={`${year}${month}${day}`}
                  date={dateDocument.date}
                  reservation={dateDocument.reservation ? dateDocument.reservation : null}
                  rejections={dateDocument.rejections ? dateDocument.rejections : null}
                  onClickNotification={onClickNotificationHandler}
                />
              </>
            );
          })
        : null}
    </>
  );
};

export default NotificationCustomer;
