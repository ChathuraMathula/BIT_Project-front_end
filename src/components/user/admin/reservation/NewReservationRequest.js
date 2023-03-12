import React, { useEffect, useState } from "react";
import { sanitize } from "../../../../utils/Sanitizer";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import FormInput from "../../../UI/form/FormInput";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import "./NewReservationRequest.css";

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
  const [transportCost, setTransportCost] = useState("");
  const [extraServicesCost, setExtraServicesCost] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");
  const [message, setMessage] = useState("");

  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const [rejected, setRejected] = useState(false);

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

  const displayWarning = (message) => {
    setWarningStyles("warning-msg-styles__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const onChangeTransportCostHandler = (e) => {
    setTransportCost(e.target.value);
  };

  const onChangeExtraServicesCostHandler = (e) => {
    setExtraServicesCost(e.target.value);
  };

  const onChangeAdvancePaymentHandler = (e) => {
    setAdvancePayment(e.target.value);
  };

  const onChangePhotographerMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  const onClickRejectReservationHandler = (e) => {
    setRejected(true);
  };

  const onClickNoHandler = (e) => {
    setRejected(false);
  };

  const onClickYesHandler = (e) => {
    fetch("http://localhost:3001/photographer/remove/reservation", {
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

  const onClickSendPaymentDetailsHandler = async (e) => {
    let photographerMsg = "";
    if (message) {
      photographerMsg = sanitize(message);
    }

    if (advancePayment) {
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
            message: { photographer: photographerMsg ? photographerMsg : "" },
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
              displayWarning("Sending payment details failed. 😐");
            } else if (data.success) {
              props.onSuccess(true);
            }
          }
        });
    } else {
      displayWarning("Please add advance payment to proceed. 😒");
    }
  };

  return (
    <>
      <div className="new-request-state__titile">
        <CalenderDateState>New Request</CalenderDateState>
      </div>
      {!rejected ? (
        <>
          <div className="new-reservation-request-main__container">
            <div className="new-reservation-request-column__container new-reservation-request-column__container-left">
              <div className="new-reservation-request-details__container">
                <div className="new-reservation-request-details__title">
                  EVENT DETAILS
                </div>
                <div>
                  <span>Event Type:</span> {event.type}
                </div>
                <div>
                  <span>Event Location:</span> {event.location}
                </div>
                <div>
                  <span>Event Time:</span>{" "}
                  {`form ${event.beginTime} to ${event.endTime}`}
                </div>
              </div>
              <div className="new-reservation-request-details__container">
                <div className="new-reservation-request-details__title">
                  CUSTOMER DETAILS
                </div>
                <div>
                  <span>Name:</span>{" "}
                  {`${customer.firstname} ${customer.lastname}`}
                </div>
                <div>
                  <span>Phone:</span> {customer.phoneNo}
                </div>
                <div>
                  <span>Email:</span> {customer.email}
                </div>
                <div>
                  <span>Address:</span> {customer.address}
                </div>
              </div>
              <div className="new-reservation-request-details__container">
                <div className="new-reservation-request-details__title">
                  PACKAGE DETAILS
                </div>
                <div>
                  <span>Category:</span> {props.reservation.category}
                </div>
                <div>
                  <span>Package:</span> {packageDocument.name}
                </div>
                <div>
                  <span>Price:</span> {packageDocument.price}
                </div>
                <div>
                  <span>Services:</span>{" "}
                  {packageDocument.services.map((service, index) => {
                    return <li key={index}>{service}</li>;
                  })}
                </div>
              </div>
              <div className="new-reservation-request__message-title">
                Customer Message
              </div>
              <div className="new-reservation-request__message">
                {props.reservation.message.customer
                  ? props.reservation.message.customer
                  : "No message to preview"}
              </div>
            </div>

            <div className="new-reservation-request-column__container new-reservation-request__payment-details">
              <div className="new-reservation-request-payment-details__titile">
                ADD PAYMENT DETAILS
              </div>
              <FormInput
                onChange={onChangeTransportCostHandler}
                value={transportCost}
                type="number"
                placeholder="LKR"
              >
                Transport Cost:{" "}
              </FormInput>
              <FormInput
                onChange={onChangeExtraServicesCostHandler}
                value={extraServicesCost}
                type="number"
                placeholder="LKR"
              >
                Extra Services Cost:{" "}
              </FormInput>
              <FormInput
                onChange={onChangeAdvancePaymentHandler}
                value={advancePayment}
                type="number"
                placeholder="LKR"
              >
                Advance Payment:{" "}
              </FormInput>
              <FormInputTextArea
                onChange={onChangePhotographerMessageHandler}
                value={message}
                placeholder="Message to the customer"
              >
                Message:{" "}
              </FormInputTextArea>
              <div className="new-reservation-request-payment-details__total">
                Estimated Total Price
                <br />
                {+packageDocument.price +
                  +advancePayment +
                  +extraServicesCost +
                  +transportCost}
              </div>
            </div>
          </div>
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <div className="new-reservation-request-button__container">
            <button
              onClick={onClickRejectReservationHandler}
              className="new-reservation-request-reject__button"
            >
              REJECT
            </button>
            <button
              onClick={onClickSendPaymentDetailsHandler}
              className="new-reservation-request-send__button"
            >
              SEND
            </button>
          </div>
        </>
      ) : null}
      {rejected ? (
        <>
          <div className="reservation-request-reject-warning__container">
            <h2>WARNING...! ⚠</h2>
            <div>
              Please make sure that you cannot recover once you reject a
              reservation. Do you really want to reject? 🙄
            </div>
          </div>
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <div>
            <div className="new-reservation-request-button__container">
              <button
                onClick={onClickYesHandler}
                className="new-reservation-request-reject__button"
              >
                Yes
              </button>
              <button
                onClick={onClickNoHandler}
                className="new-reservation-request-send__button"
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

export default NewReservationRequest;
