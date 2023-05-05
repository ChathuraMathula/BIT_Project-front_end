import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../context/Context";
import WaitingCustomerPaymentDetails from "../../user/admin/reservation/WaitingCustomerPaymentDetails";

/**
 *
 * @param reservation
 * @returns
 */
const NotificationPendingOrange = (props) => {
  const login = useContext(UserLoginContext);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    if (props.reservation?.endsAt) {
      const endDate = new Date(props.reservation.endsAt);
      setInterval(() => {
        const thisDate = new Date();
        let remainingTime = endDate.getTime() - thisDate.getTime(); // miliseconds

        let remainingHours = Math.floor(remainingTime / 1000 / 60 / 60);
        if (remainingHours < 10) {
          remainingHours = remainingHours.toString().padStart(2, "0");
        }
        remainingTime -= remainingHours * 1000 * 60 * 60;

        let remainingMinutes = Math.floor(remainingTime / 1000 / 60);
        if (remainingMinutes < 10) {
          remainingMinutes = remainingMinutes.toString().padStart(2, "0");
        }
        remainingTime -= remainingMinutes * 1000 * 60;

        let remainingSeconds = Math.floor(remainingTime / 1000);
        if (remainingSeconds < 10) {
          remainingSeconds = remainingSeconds.toString().padStart(2, "0");
        }

        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      }, 1000);
    }
  }, []);

  if (login.user?.role === "admin" || login.user?.role === "photographer") {
    return (
      <>
        <div>
          {`Please wait... 😊 Your customer will respond with payment details
          within, `}
          <span
            style={{ color: "hsl(136, 100%, 36%)", fontWeight: "bold" }}
          >{`${hours}:${minutes}:${seconds}`}</span>
        </div>
      </>
    );
  } else if (
    login.user?.role === "customer"
  ) {
    return (
      <>
        <div>
          {`To get reserved this date you have to respond with your valid payment details
          within  `}
          <span
            style={{ color: "red", fontWeight: "bold" }}
          >{`${hours}:${minutes}:${seconds}`}</span>
        </div>
      </>
    );
  }
};

export default NotificationPendingOrange;
