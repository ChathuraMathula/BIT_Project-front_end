import React, { useEffect, useState } from "react";
import { sanitize } from "../../../../utils/Sanitizer";
import GreenButton from "../../../UI/buttons/GreenButton";
import RedButton from "../../../UI/buttons/RedButton";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import WarningCard from "../../../UI/cards/WarningCard";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import DetailsContainer from "../../../UI/containers/DetailsContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import FormInput from "../../../UI/form/FormInput";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import NameValueString from "../../../UI/other/NameValueString";
import NameValueTitle from "../../../UI/other/NameValueTitle";
import CardContainerTitle from "../../../UI/titles/CardContainerTitle";
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
    setTransportCost(sanitize(e.target.value));
  };

  const onChangeExtraServicesCostHandler = (e) => {
    setExtraServicesCost(sanitize(e.target.value));
  };

  const onChangeAdvancePaymentHandler = (e) => {
    setAdvancePayment(sanitize(e.target.value));
  };

  const onChangePhotographerMessageHandler = (e) => {
    setMessage(sanitize(e.target.value));
  };

  const onClickRejectReservationHandler = (e) => {
    setRejected(true);
  };

  const onClickNoHandler = (e) => {
    setRejected(false);
  };

  const onClickYesHandler = (e) => {
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
      <CalenderDateState>New Request</CalenderDateState>

      {!rejected ? (
        <>
          <ModalCardContainer>
            <DetailsContainer>
              <NameValueTitle>EVENT DETAILS</NameValueTitle>
              <NameValueString name="Event Type:" value={event.type} />
              <NameValueString name="Event Location:" value={event.location} />
              <NameValueString
                name="Event Time:"
                value={`From ${event.beginTime} to ${event.endTime}`}
              />
            </DetailsContainer>
            <DetailsContainer>
              <NameValueTitle>CUSTOMER DETAILS</NameValueTitle>
              <NameValueString
                name="Name:"
                value={`${customer.firstname} ${customer.lastname}`}
              />
              <NameValueString name="Phone No:" value={customer.phoneNo} />
              <NameValueString name="Email:" value={customer.email} />
              <NameValueString name="Address:" value={customer.address} />
            </DetailsContainer>
            <DetailsContainer>
              <NameValueTitle>PACKAGE DETAILS</NameValueTitle>
              <NameValueString
                name="Category:"
                value={props.reservation.category}
              />
              <NameValueString name="Package:" value={packageDocument.name} />
              <NameValueString name="Price:" value={packageDocument.price} />
              <NameValueString
                name="Services:"
                value={
                  packageDocument.services.length > 0
                    ? packageDocument.services.map((service, index) => {
                        return <li key={index}>{service}</li>;
                      })
                    : "Package Has been Removed"
                }
              />
            </DetailsContainer>
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

            <FormInput
              onChange={onChangeTransportCostHandler}
              value={transportCost}
              type="text"
              placeholder="LKR"
            >
              Transport Cost:{" "}
            </FormInput>
            <FormInput
              onChange={onChangeExtraServicesCostHandler}
              value={extraServicesCost}
              type="text"
              placeholder="LKR"
            >
              Extra Services Cost:{" "}
            </FormInput>
            <FormInput
              onChange={onChangeAdvancePaymentHandler}
              value={advancePayment}
              type="text"
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
              {+packageDocument.price + +extraServicesCost + +transportCost}
            </div>
          </ModalCardContainer>

          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
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
          <WarningCard
            warning={`Please make sure that you cannot recover once you reject a
            reservation. Do you really want to reject? 🙄`}
          />
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <ButtonContainer>
            <RedButton onClick={onClickYesHandler}>Yes</RedButton>
            <GreenButton onClick={onClickNoHandler}>No</GreenButton>
          </ButtonContainer>
        </>
      ) : null}
    </>
  );
};

export default NewReservationRequest;
