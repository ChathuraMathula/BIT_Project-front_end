import React, { useEffect, useState } from "react";
import { sanitize } from "../../../../utils/Sanitizer";
import GreenButton from "../../../UI/buttons/GreenButton";
import RedButton from "../../../UI/buttons/RedButton";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import WarningCard from "../../../UI/cards/WarningCard";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import DetailsContainer from "../../../UI/containers/DetailsContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import FormInputCheckBox from "../../../UI/form/FormInputCheckBox";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import NameValueString from "../../../UI/other/NameValueString";
import NameValueTitle from "../../../UI/other/NameValueTitle";
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
  const [fileUrl, setFileUrl] = useState("");

  const payment = props.reservation.payment;
  const costs = props.reservation.costs;
  const thisYear = props.date.getFullYear();
  const thisMonth = props.date.getMonth();
  const thisDay = props.date.getDate();

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
          <ModalCardContainer>
            <DetailsContainer>
              <NameValueTitle>COSTS DETAILS</NameValueTitle>
              <NameValueString
                name="Transport Cost:"
                value={`${costs.transport} LKR`}
              />

              <NameValueString
                name="Extra Services Cost:"
                value={`${costs.extraServices} LKR`}
              />

              <NameValueString
                name="Package Price:"
                value={`${costs.package} LKR`}
              />
              <NameValueString name="Advance Payment:" value={`${costs.advance} LKR`} />
            </DetailsContainer>
            <DetailsContainer>
              <NameValueTitle>PAYMENT DETAILS</NameValueTitle>
              <NameValueString
                name="Paid Method:"
                value={`By ${payment.method}`}
              />
              {payment.method === "bank" ? (
                <NameValueString
                  name="Paid Bank Branch:"
                  value={payment.branch}
                />
              ) : null}
              <NameValueString
                name="Paid Amount:"
                value={`${payment.amount} LKR`}
              />
              <NameValueString name="Paid Date:" value={payment.date} />
              <NameValueString name="Paid Time:" value={payment.time} />
            </DetailsContainer>
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
          </ModalCardContainer>
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <ButtonContainer>
            <RedButton onClick={onClickRejectHandler}>Reject</RedButton>
            <GreenButton onClick={onClickConfirmHandler}>Confirm</GreenButton>
          </ButtonContainer>
        </>
      ) : null}
      {rejected ? (
        <>
          <WarningCard
            warning={`Please make sure that you cannot recover once you reject a
            reservation. Do you really want to reject? 🙄`}
          />
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <ButtonContainer>
            <RedButton onClick={onClickRejectYesHandler}>Yes</RedButton>
            <GreenButton onClick={onClickRejectNoHandler}>No</GreenButton>
          </ButtonContainer>
        </>
      ) : null}
    </>
  );
};

export default ReservationConfirmation;
