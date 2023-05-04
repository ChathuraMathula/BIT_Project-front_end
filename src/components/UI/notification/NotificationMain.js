import React, { useContext, useEffect, useState } from "react";
import NotificationButton from "./NotificationButton";
import InfoModal from "../modal/InfoModal";
import { UserLoginContext } from "../../../context/Context";
import NotificationAdmin from "./NotificationAdmin";
import NotificationCustomer from "./NotificationCustomer";
import socket from "../../../utils/socket";

const NotificationMain = (props) => {
  const login = useContext(UserLoginContext);
  const [showModal, setShowModal] = useState(false);
  const [datesArray, setDatesArray] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/available/dates")
      .then((res) => res.json())
      .then((dates) => {
        setDatesArray([...dates]);
      });

    socket.on("dates", (dates) => {
      setDatesArray([...dates]);
    });
  }, []);

  const onClickNotificationButtonHandler = (event) => {
    setShowModal(true);
  };

  const onCloseModalHandler = (event) => {
    setShowModal(false);
  };

  return (
    <>
      <NotificationButton onClick={onClickNotificationButtonHandler} />
      <InfoModal
        heading="Notifications"
        show={showModal}
        onClose={onCloseModalHandler}
      >
        {login.user?.role === "admin" || login.user?.role === "photographer" ? (
          <>
            <NotificationAdmin dates={datesArray} />
          </>
        ) : login.user?.role === "customer" ? (
          <>
            <NotificationCustomer />
          </>
        ) : null}
      </InfoModal>
    </>
  );
};

export default NotificationMain;
