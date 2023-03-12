import React, { useEffect, useState } from "react";
import CalenderDateState from "../../UI/calender/CalenderDateState";
import "./CustomerPaymentDetails.css";

/**
 *
 * @param date
 * @param onSuccess
 * @param reservation
 * @returns
 */
const CustomerPaymentDetails = (props) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [photographer, setPhotographer] = useState({});

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

    fetch("http://localhost:3001/photographer/details")
      .then((res) => res.json())
      .then((photographerDocument) => {
        if (photographerDocument) {
          setPhotographer({ ...photographerDocument });
        }
      });
  }, []);

  return (
    <>
      <CalenderDateState>Send Payment Details</CalenderDateState>

      <div className="customer-payment-details-response__notice">
        Please add valid payment details to get reserved a date within
        <span>{` ${hours} : ${minutes} : ${seconds} `}</span> <br />
        Otherwise your request is rejected...! 🙂
      </div>
      <div className="customer-payment-details__photographer-message-title">
        Photographer Message
      </div>
      <div className="customer-payment-details__photographer-message">
        {props.reservation.message.photographer[0]
          ? props.reservation.message.photographer[0]
          : "No message to preview"}
      </div>
      <div className="customer-payment-details-costs__container">
        <div className="customer-payment-details-costs__title">COSTS</div>
        <div className="customer-payment-details-costs__row">
          <div className="customer-payment-details-costs__name">
            Package {`(${props.reservation.package})`}
          </div>
          <div className="customer-payment-details-costs__price">
            {props.reservation.costs.package} LKR
          </div>
        </div>
        <div className="customer-payment-details-costs__row">
          <div className="customer-payment-details-costs__name">
            Extra Services
          </div>
          <div className="customer-payment-details-costs__price">
            {props.reservation.costs.extraServices} LKR
          </div>
        </div>
        <div className="customer-payment-details-costs__row">
          <div className="customer-payment-details-costs__name">Transport</div>
          <div className="customer-payment-details-costs__price">
            {props.reservation.costs.transport} LKR
          </div>
        </div>
        <div className="customer-payment-details-costs__row">
          <div className="customer-payment-details-costs__name">
            Estimated Total
          </div>
          <div className="customer-payment-details-costs__price">
            {+props.reservation.costs.transport +
              +props.reservation.costs.package +
              +props.reservation.costs.extraServices}{" "}
            LKR
          </div>
        </div>
        <div className="customer-payment-details-costs__row">
          <div className="customer-payment-details-costs__name">
            Advance Payment
          </div>
          <div className="customer-payment-details-costs__price">
            {props.reservation.costs.advance} LKR
          </div>
        </div>
        <div className="customer-payment-details__bank-details">
          <div>Please pay advance payment to,</div>
          <div><span>Bank: </span>{photographer.bankName}</div>
          <div><span>Account No: </span>{photographer.bankAccountNo}</div>
        </div>
      </div>
    </>
  );
};

export default CustomerPaymentDetails;
