import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";

const NotificationPendingYellow = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user?.role === "admin" || login.user?.role === "photographer") {
    return (
      <>
        <div>
          You have a new reservation request. Please send cost details ASAP!
        </div>
      </>
    );
  } else if (login.user?.role === "customer") {
    return (
      <>
        <div>
          Pending cost details. You have to wait until the photographer sends cost details.
        </div>
      </>
    );
  }
};

export default NotificationPendingYellow;
