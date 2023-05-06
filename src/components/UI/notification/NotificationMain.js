import React, { useContext, useEffect, useState } from "react";
import NotificationButton from "./NotificationButton";
import InfoModal from "../modal/InfoModal";
import { UserLoginContext } from "../../../context/Context";
import NotificationAdmin from "./NotificationAdmin";
import NotificationCustomer from "./NotificationCustomer";
import socket from "../../../utils/socket";
import Modal from "../modal/Modal";
import NotificationControllerAdmin from "./NotificationControllerAdmin";
import NotificationControllerCustomer from "./NotificationControllerCustomer";

const NotificationMain = (props) => {
  const login = useContext(UserLoginContext);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [datesArray, setDatesArray] = useState([]);
  const [adminNotificationDates, setAdminNotificationDates] = useState([]);
  const [customerNotificationDates, setCustomerNotificationDates] = useState(
    []
  );
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const [state, setState] = useState(null);
  const [date, setDate] = useState(new Date());
  const [reservation, setReservation] = useState({});
  const [rejection, setRejection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/available/dates")
      .then((res) => res.json())
      .then((dates) => {
        console.log("Normal Dates TEST >>>")
        setDatesArray([...getFutureDates(dates)]);
      });

    socket.on("dates", (dates) => {
      console.log("Socket Dates TEST >>>")
      setDatesArray([...getFutureDates(dates)]);
    });
  }, [state]);

  const getFutureDates = (arrayOfDates) => {
    const today = new Date();
    const currentArrayOfDates = [];

    arrayOfDates.forEach((dateDocument) => {
      const day = dateDocument.date.day;
      const month = dateDocument.date.month;
      const year = dateDocument.date.year;

      const currentdate = new Date(year, month, day);

      if (currentdate > today) {
        currentArrayOfDates.push(dateDocument);
      }
    });
    return currentArrayOfDates;
  };

  useEffect(() => {
    if (datesArray.length > 0) {
      const currentAdminNotificationDatesArray = [];
      const currentCustomerNotificationDatesArray = [];
      datesArray.forEach((dateDocument) => {
        if (
          login.user?.role === "admin" ||
          login.user?.role === "photographer"
        ) {
          if (dateDocument.hasOwnProperty("reservation")) {
            currentAdminNotificationDatesArray.push(dateDocument);
          }
        } else if (login.user?.role === "customer") {
          if (
            dateDocument.hasOwnProperty("reservation") &&
            dateDocument.reservation?.customer === login.user?.name
          ) {
            currentCustomerNotificationDatesArray.push(dateDocument);
          } else if (dateDocument.hasOwnProperty("rejections")) {
            if (dateDocument.rejections.length > 0) {
              const rejectionsArray = dateDocument.rejections;
              for (let i = rejectionsArray.length - 1; i >= 0; i--) {
                if (rejectionsArray[i]?.customer === login.user?.name) {
                  const tempDate = {
                    date: dateDocument.date,
                    rejections: [rejectionsArray[i]],
                  };
                  currentCustomerNotificationDatesArray.push(tempDate);
                  break;
                }
              }
            }
          }
        }
      });

      setAdminNotificationDates([...currentAdminNotificationDatesArray]);
      setCustomerNotificationDates([...currentCustomerNotificationDatesArray]);
      if (login.user?.role === "admin" || login.user?.role === "photographer") {
        setNumberOfNotifications(currentAdminNotificationDatesArray.length);
      } else if (login.user?.role === "customer") {
        setNumberOfNotifications(currentCustomerNotificationDatesArray.length);
      }
    }
  }, [datesArray, state]);

  const onClickNotificationButtonHandler = (event) => {
    setShowNotificationModal(true);
  };

  const onCloseModalHandler = (event) => {
    setShowNotificationModal(false);
  };

  const onClickNotificationHandler = (notificationData) => {
    console.log("TEST >>>>>>>>>>>> ", notificationData)
    setState(notificationData.state);
    const currentDate = notificationData.date;
    setDate(new Date(currentDate.year, currentDate.month, currentDate.day));
    if (notificationData.hasOwnProperty("reservation")) {
      setReservation({ ...notificationData.reservation });
    } else if (notificationData.hasOwnProperty("rejections")) {
      setRejection([...notificationData.rejections]);
    }

    setShowModal(true);
  };

  const onCloseNormalModalHandler = (event) => {
    setShowModal(false);
  };

  const onSuccessHandler = (success) => {
    if (success) {
      setShowModal(false);
    }
  };

  return (
    <>
      <NotificationButton
        onClick={onClickNotificationButtonHandler}
        count={numberOfNotifications}
      />
      <InfoModal
        heading="Notifications"
        show={showNotificationModal}
        onClose={onCloseModalHandler}
      >
        {login.user?.role === "admin" || login.user?.role === "photographer" ? (
          <>
            <NotificationAdmin
              onClickNotification={onClickNotificationHandler}
              dates={adminNotificationDates}
            />
          </>
        ) : login.user?.role === "customer" ? (
          <>
            <NotificationCustomer
              onClickNotification={onClickNotificationHandler}
              dates={customerNotificationDates}
            />
          </>
        ) : null}
      </InfoModal>
      <Modal
        show={showModal}
        onClose={onCloseNormalModalHandler}
        onBackdropClick={onCloseNormalModalHandler}
        heading={`${date.toDateString()}`}
      >
        {login.user?.role === "admin" || login.user?.role === "photographer" ? (
          <>
            <NotificationControllerAdmin
              state={state}
              date={date}
              reservation={reservation}
              onSuccess={onSuccessHandler}
            />
          </>
        ) : null}
        {login.user?.role === "customer" ? (
          <>
            <NotificationControllerCustomer
              state={state}
              date={date}
              reservation={reservation}
              rejection={rejection}
              onSuccess={onSuccessHandler}
            />
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default NotificationMain;
