import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";

const NotificationPendingRed = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user?.role === "admin" || login.user?.role === "photographer") {
    return (
      <>
        <div>
          You have to confirm this reservation request. Your customer is
          waiting. Please hurry!
        </div>
      </>
    );
  } else if (login.user?.role === "customer") {
    return (
      <>
        <div>
          Pending confirmation. You have to wait until the photographer confirms
          your reservation request
        </div>
      </>
    );
  }
};

export default NotificationPendingRed;
