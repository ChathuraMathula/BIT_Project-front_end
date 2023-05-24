import React, { useEffect, useState } from "react";
import useWarningMessage from "../../../../hooks/useWarningMessage";
import DownloadSVG from "../../../UI/SVG/DownloadSVG";
import GreenButton from "../../../UI/buttons/GreenButton";
import RedButton from "../../../UI/buttons/RedButton";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import WarningMessageBox from "../../../UI/warnings/WarningMessageBox";
import CostDetails from "../../customer/CostDetails";
import CustomerDetails from "../../customer/CustomerDetails";
import EventDetails from "../../customer/EventDetaills";
import PackageDetails from "../../customer/PackageDetails";
import PaymentDetails from "../../customer/PaymentDetails";
import "./ReservationConfirmation.css";
import ReservationRejection from "./ReservationRejection";

/**
 *
 * @param reservation (object) reservation document
 * @param date (object) date document
 * @param onSuccess handler function for success
 * @returns
 */
const ReservationConfirmation = (props) => {
  const [rejected, setRejected] = useState(false);
  const [warningMessage, setWarningMessage] = useWarningMessage();
  const [fileUrl, setFileUrl] = useState("");

  const payment = props.reservation.payment;
  const costs = props.reservation.costs;
  const customer = props.reservation.customer;
  const thisYear = props.date.getFullYear();
  const thisMonth = props.date.getMonth();
  const thisDay = props.date.getDate();

  const onClickRejectHandler = (e) => {
    setRejected(true);
  };

  const onCancelRejectHandler = (cancelRejection) => {
    if (cancelRejection) {
      setRejected(false);
    }
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
            setWarningMessage("Confirm reservation failed.");
          } else if (data.success) {
            props.onSuccess(true);
          }
        }
      });
  };

  const onSuccessRejectionHandler = (successRejection) => {
    if (successRejection) {
      props.onSuccess(true);
    }
  };

  return (
    <>
      <CalenderDateState>Confirm Reservation</CalenderDateState>
      {!rejected ? (
        <>
          <ModalCardContainer>
            <EventDetails reservation={props.reservation} />
          </ModalCardContainer>
          <ModalCardContainer>
            <CustomerDetails username={props.reservation?.customer} />
          </ModalCardContainer>
          <ModalCardContainer>
            <PackageDetails reservation={props.reservation} />
          </ModalCardContainer>
          <ModalCardContainer>
            <CostDetails reservation={props.reservation} />
          </ModalCardContainer>
          <ModalCardContainer>
            <PaymentDetails reservation={props.reservation} />
          </ModalCardContainer>

          <ModalCardContainer>
            <div className="reservation-confirmation__download">
              Download Bank Payment Slip/Screenshot of payment
              <a
                download={`${thisYear}_${thisMonth}_${thisDay}_payment_slip.jpeg`}
                href={fileUrl}
                className="reservation-confirmation-download-button"
              >
                <DownloadSVG />
              </a>
            </div>
          </ModalCardContainer>
          <WarningMessageBox message={warningMessage} />
          <ButtonContainer>
            <RedButton onClick={onClickRejectHandler}>Reject</RedButton>
            <GreenButton onClick={onClickConfirmHandler}>Confirm</GreenButton>
          </ButtonContainer>
        </>
      ) : null}
      {rejected ? (
        <>
          <ReservationRejection
            thisYear={thisYear}
            thisMonth={thisMonth}
            thisDay={thisDay}
            onSuccess={onSuccessRejectionHandler}
            onCancel={onCancelRejectHandler}
            customer={customer}
          />
        </>
      ) : null}
    </>
  );
};

export default ReservationConfirmation;
