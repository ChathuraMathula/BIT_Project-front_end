import React, { useEffect, useState } from "react";
import { sanitize } from "../../../../utils/Sanitizer";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import FormInputCheckBox from "../../../UI/form/FormInputCheckBox";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import DownloadSVG from "../../../UI/SVG/DownloadSVG";
import "./ReservationConfirmation.css";

/**
 *
 * @param reservation (object) reservation document
 * @param date (object) date document
 * @param onSuccess handler function for success
 * @returns
 */
const ReservationConfirmation = (props) => {
  const [rejected, setRejected] = useState(false);
  const [warningStyles, setWarningStyles] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [photographerMsg, setPhotographerMsg] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const payment = props.reservation.payment;
  const thisYear = props.date.getFullYear();
  const thisMonth = props.date.getMonth();
  const thisDay = props.date.getDate();

  const onChangePhotographerMsgHandler = (e) => {
    setPhotographerMsg(sanitize(e.target.value));
  };

  const onClickRejectHandler = (e) => {
    setRejected(true);
  };

  const onClickRejectNoHandler = (e) => {
    setRejected(false);
  };

  const displayWarning = (message) => {
    setWarningStyles("login-form-warning__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  useEffect(() => {
    fetch("http://localhost:3001/payment/slip/photo", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        year: thisYear,
        month: thisMonth,
        day: thisDay,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.blob())
      .then((data) => {
        if (data) {
          console.log("PICTURE", data);
          if (data.type === "image/jpeg") {
            setFileUrl(URL.createObjectURL(data));
          } else {
            setFileUrl("");
          }
        }
      });
  }, []);

  const onClickRejectYesHandler = (e) => {
    fetch("http://localhost:3001/remove/reservation", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        date: {
          year: thisYear,
          month: thisMonth,
          day: thisDay,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          if (!data.success) {
            displayWarning("Removing reservation failed. 😐");
          } else if (data.success) {
            props.onSuccess(true);
          }
        }
      });
  };

  const onClickConfirmHandler = async (e) => {
    await fetch("http://localhost:3001/confirm/reservation", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        date: {
          year: thisYear,
          month: thisMonth,
          day: thisDay,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          if (!data.success) {
            displayWarning("Confirm reservation failed. 😐");
          } else if (data.success) {
            props.onSuccess(true);
          }
        }
      });
  };

  const onClickDownloadPaymentSlip = async (e) => {};

  return (
    <>
      <CalenderDateState>Confirm Reservation</CalenderDateState>
      {!rejected ? (
        <>
          <div className="reservation-confirmation__container">
            <div className="reservation-confirmation__title">
              PAYMENT DETAILS
            </div>
            <div className="reservation-confirmation__item">
              <span>Paid Method: </span>
              {`by ${payment.method}`}
            </div>
            {payment.method === "bank" ? (
              <div className="reservation-confirmation__item">
                <span>Paid Bank Branch: </span>
                {payment.branch}
              </div>
            ) : null}
            <div className="reservation-confirmation__item">
              <span>Paid Amount: </span>
              {payment.amount} LKR
            </div>
            <div className="reservation-confirmation__item">
              <span>Paid Date: </span>
              {payment.date}
            </div>
            <div className="reservation-confirmation__item">
              <span>Paid time: </span>
              {payment.time}
            </div>
            <div className="reservation-confirmation__download">
              Download Bank Payment Slip/Screenshot of payment
              <a
                download={`${thisYear}_${thisMonth}_${thisDay}_payment_slip.jpeg`}
                href={fileUrl}
                onClick={onClickDownloadPaymentSlip}
                className="reservation-confirmation-download-button"
              >
                <DownloadSVG />
              </a>
            </div>
          </div>
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <div className="reservation-confirmation-button__container">
            <button
              onClick={onClickRejectHandler}
              className="reservation-confirmation-button__red"
            >
              Reject
            </button>
            <button
              onClick={onClickConfirmHandler}
              className="reservation-confirmation-button__green"
            >
              Confirm
            </button>
          </div>
        </>
      ) : null}
      {rejected ? (
        <>
          <div className="reservation-confirmation__container">
            <h2 className="reservation-confirmation-warning__title">
              WARNING...! ⚠
            </h2>
            <div className="reservation-confirmation-warning__notice">
              Please make sure that you cannot recover once you reject a
              reservation. Do you really want to reject? 🙄
            </div>
          </div>
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <div>
            <div className="reservation-confirmation-button__container">
              <button
                onClick={onClickRejectYesHandler}
                className="reservation-confirmation-button__red"
              >
                Yes
              </button>
              <button
                onClick={onClickRejectNoHandler}
                className="reservation-confirmation-button__green"
              >
                No
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ReservationConfirmation;
