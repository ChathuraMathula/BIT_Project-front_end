import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";

const NotificationConfirmed = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user?.role === "admin" || login.user?.role === "photographer") {
    return (
      <>
        <div>This date is successfully reserved. Please keep in mind.</div>
      </>
    );
  } else if (login.user?.role === "customer") {
    return (
      <>
        <div>This date is successfully reserved.</div>
      </>
    );
  }
};

export default NotificationConfirmed;
