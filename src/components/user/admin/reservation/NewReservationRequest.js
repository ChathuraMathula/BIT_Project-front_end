import React, { useEffect, useState } from "react";
import useWarningMessage from "../../../../hooks/useWarningMessage";
import GreenButton from "../../../UI/buttons/GreenButton";
import RedButton from "../../../UI/buttons/RedButton";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import CostInput from "../../../UI/inputs/CostInput";
import MessageInput from "../../../UI/inputs/MessageInput";
import CardContainerTitle from "../../../UI/titles/CardContainerTitle";
import WarningMessageBox from "../../../UI/warnings/WarningMessageBox";
import CustomerDetails from "../../customer/CustomerDetails";
import EventDetails from "../../customer/EventDetaills";
import PackageDetails from "../../customer/PackageDetails";
import "./NewReservationRequest.css";
import ReservationRejection from "./ReservationRejection";

/**
 *
 * @param reservation (object) reservation document
 * @param date (object) date document
 * @param onSuccess handler function for success
 * @returns
 */
const NewReservationRequest = (props) => {
  const [customer, setCustomer] = useState({});
  const [packageDocument, setPackageDocument] = useState({ services: [] });

  const [warningMessage, setWarningMessage] = useWarningMessage();

  const [rejected, setRejected] = useState(false);
  const [transportCost, setTransportCost] = useState("");
  const [extraServicesCost, setExtraServicesCost] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");
  const [message, setMessage] = useState("");

  const event = props.reservation.event;
  const thisYear = props.date.getFullYear();
  const thisMonth = props.date.getMonth();
  const thisDay = props.date.getDate();

  useEffect(() => {
    fetch("http://localhost:3001/user", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username: props.reservation.customer }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((customerDoc) => {
        setCustomer({ ...customerDoc });
      });

    fetch("http://localhost:3001/package/categories")
      .then((res) => res.json())
      .then((categories) => {
        console.log(categories);
        if (categories) {
          const packageCategory = categories.filter((category) => {
            return category.name === props.reservation.category;
          });

          const packageArray = packageCategory[0].packages.filter(
            (packageDoc) => packageDoc.name === props.reservation.package
          );

          setPackageDocument(packageArray[0]);
        }
      });
  }, []);

  const onChangeTransportCostHandler = (cost) => {
    console.log(cost);
    setTransportCost(cost);
  };

  const onChangeExtraServicesCostHandler = (cost) => {
    console.log(cost);
    setExtraServicesCost(cost);
  };

  const onChangeAdvancePaymentHandler = (cost) => {
    console.log(cost);
    setAdvancePayment(cost);
  };

  const onChangePhotographerMessageHandler = (photographerMessage) => {
    setMessage(photographerMessage);
  };

  const onClickRejectReservationHandler = (e) => {
    setRejected(true);
  };

  const onClickSendPaymentDetailsHandler = async (e) => {
    if (advancePayment && transportCost && extraServicesCost) {
      if (
        advancePayment !== "invalid" &&
        transportCost !== "invalid" &&
        extraServicesCost !== "invalid" &&
        (!message || message !== "invalid")
      ) {
        await fetch(
          "http://localhost:3001/photographer/send/reservation/payment/details",
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              date: {
                year: thisYear,
                month: thisMonth,
                day: thisDay,
              },
              costs: {
                transport: transportCost ? +transportCost : 0,
                extraServices: extraServicesCost ? +extraServicesCost : 0,
                advance: +advancePayment,
                package: +packageDocument.price,
              },
              message: {
                photographer: message && message !== "invalid" ? message : "",
              },
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data) {
              if (!data.success) {
                setWarningMessage("Sending payment details failed.");
              } else if (data.success) {
                props.onSuccess(true);
              }
            }
          });
      } else {
        setWarningMessage("Please add valid data to proceed.");
      }
    } else {
      setWarningMessage("Cost data cannot be empty.");
    }
  };

  const onSuccessRejectionHandler = (successRejection) => {
    if (successRejection) {
      props.onSuccess(true);
    }
  };

  const onCancelRejectHandler = (cancelRejection) => {
    if (cancelRejection) {
      setRejected(false);
    }
  };

  return (
    <>
      <CalenderDateState>New Request</CalenderDateState>

      {!rejected ? (
        <>
          <ModalCardContainer>
            <EventDetails reservation={props.reservation} />
          </ModalCardContainer>
          <ModalCardContainer>
            <CustomerDetails username={props.reservation.customer} />
          </ModalCardContainer>
          <ModalCardContainer>
            <PackageDetails reservation={props.reservation} />
          </ModalCardContainer>
          <ModalCardContainer>
            <div className="new-reservation-request__message-title">
              Customer Message
            </div>
            <div className="new-reservation-request__message">
              {props.reservation.message.customer
                ? props.reservation.message.customer
                : "No message to preview"}
            </div>
          </ModalCardContainer>

          <ModalCardContainer>
            <CardContainerTitle>ADD PAYMENT DETAILS</CardContainerTitle>

            <CostInput
              name="Transport Cost"
              onChange={onChangeTransportCostHandler}
            />
            <CostInput
              name="Extra Services Cost"
              onChange={onChangeExtraServicesCostHandler}
            />
            <CostInput
              name="Advance Payment"
              onChange={onChangeAdvancePaymentHandler}
            />

            <MessageInput
              name="Message"
              onChange={onChangePhotographerMessageHandler}
              placeholder="Message to the customer"
            />

            <div className="new-reservation-request-payment-details__total">
              Estimated Total Price
              <br />
              {+packageDocument.price + +extraServicesCost + +transportCost}
            </div>
          </ModalCardContainer>

          <WarningMessageBox message={warningMessage} />
          <ButtonContainer>
            <RedButton onClick={onClickRejectReservationHandler}>
              Reject
            </RedButton>
            <GreenButton onClick={onClickSendPaymentDetailsHandler}>
              Send
            </GreenButton>
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
            customer={customer.username}
          />
        </>
      ) : null}
    </>
  );
};

export default NewReservationRequest;
