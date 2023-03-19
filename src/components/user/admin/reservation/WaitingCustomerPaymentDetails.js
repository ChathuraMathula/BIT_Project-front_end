import React, { useEffect, useState } from "react";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import "./WaitingCustomerPaymentDetails.css";

/**
 *
 * @param reservation (object) reservation document
 * @returns
 */
const WaitingCustomerPaymentDetails = (props) => {
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
  return (
    <>
      <CalenderDateState>Waiting</CalenderDateState>
      <ModalCardContainer>
        <div className="waiting-customer-payment-details-notice">
          Please wait... 😊 Your customer will respond with payment details
          within,
          <br />
          <span>{`${hours}:${minutes}:${seconds}`}</span>
        </div>
      </ModalCardContainer>
    </>
  );
};

export default WaitingCustomerPaymentDetails;
