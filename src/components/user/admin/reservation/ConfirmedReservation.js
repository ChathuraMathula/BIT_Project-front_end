import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../../context/Context";
import GreenButton from "../../../UI/buttons/GreenButton";
import OrangeButton from "../../../UI/buttons/OrangeButton";
import RedButton from "../../../UI/buttons/RedButton";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import WarningCard from "../../../UI/cards/WarningCard";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import DetailsContainer from "../../../UI/containers/DetailsContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import NameValueString from "../../../UI/other/NameValueString";
import NameValueTitle from "../../../UI/other/NameValueTitle";
import "./ConfirmedReservation.css";
import UpdateReservation from "./UpdateReservation";

/**
 *
 * @param reservation (object) reservation document
 * @param date (object) date document
 * @param onSuccess handler function for success
 * @returns
 */
const ConfirmedReservation = (props) => {
  const login = useContext(UserLoginContext);

  const [customer, setCustomer] = useState({});
  const [packageDocument, setPackageDocument] = useState({ services: [] });
  const [deleteReservation, setDeleteReservation] = useState(false);

  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const [update, setUpdate] = useState(false);

  const reservation = props.reservation;

  const thisDay = props.date.getDate();
  const thisMonth = props.date.getMonth();
  const thisYear = props.date.getFullYear();

  const displayWarning = (message) => {
    setWarningStyles("warning-msg-styles__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

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
        if (categories) {
          const packageCategory = categories.filter((category) => {
            return category.name === props.reservation.category;
          });

          const packageArray = packageCategory[0]?.packages.filter(
            (packageDoc) => packageDoc.name === props.reservation.package
          );

          setPackageDocument({
            ...packageArray[0],
            category: packageCategory[0].name,
          });
        }
      });
  }, [props.reservation]);

  const onClickDeleteNoHandler = (e) => {
    setDeleteReservation(false);
  };

  const onClickDeleteYesHandler = async (e) => {
    await fetch("http://localhost:3001/remove/reservation", {
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

  const onClickDeleteHandler = (e) => {
    setDeleteReservation(true);
  };

  const onClickUpdateHandler = (e) => {
    setUpdate(true);
  };

  return (
    <>
      <CalenderDateState>Reserved</CalenderDateState>
      {!deleteReservation && !update ? (
        <>
          <ModalCardContainer>
            <DetailsContainer>
              <NameValueTitle>EVENT DETAILS</NameValueTitle>
              <NameValueString
                name="Event Type:"
                value={reservation.event.type}
              />
              <NameValueString
                name="Event Location:"
                value={reservation.event.location}
              />
              <NameValueString
                name="Event Time:"
                value={`From ${reservation.event.beginTime} to ${reservation.event.endTime}`}
              />
            </DetailsContainer>
            {login.user.name === "admin" ||
            login.user.name === "photographer" ? (
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
            ) : null}
            <DetailsContainer>
              <NameValueTitle>RESERVATION DETAILS</NameValueTitle>
              <NameValueString
                name="Category:"
                value={
                  packageDocument.category
                    ? packageDocument.category
                    : "Package Has been Removed"
                }
              />
              <NameValueString
                name="Package:"
                value={
                  packageDocument.name
                    ? packageDocument.name
                    : "Package Has been Removed"
                }
              />
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
              {reservation?.extraServices.length > 0 ? (
                <>
                  <NameValueString
                    name="Extra Services:"
                    value={reservation?.extraServices.map((service, index) => {
                      if (service.quantity) {
                        return (
                          <li
                            key={index}
                          >{`${service.name} [Quantity: ${service.quantity}]`}</li>
                        );
                      } else {
                        return <li key={index}>{service.name}</li>;
                      }
                    })}
                  />
                </>
              ) : null}
              <NameValueString
                name="Estimated Total Cost:"
                value={`${
                  +reservation.costs.transport +
                  +reservation.costs.extraServices +
                  +reservation.costs.package
                } LKR`}
              />
              <NameValueString
                name="Advance Payment:"
                value={`${+reservation.costs.advance} LKR`}
              />
            </DetailsContainer>
          </ModalCardContainer>
          {login.user.name === "admin" ? (
            <>
              <ButtonContainer>
                <RedButton onClick={onClickDeleteHandler}>Delete</RedButton>
                <OrangeButton onClick={onClickUpdateHandler}>
                  Update
                </OrangeButton>
              </ButtonContainer>
            </>
          ) : null}
        </>
      ) : null}
      {deleteReservation ? (
        <>
          <WarningCard
            warning={`Please make sure that you cannot recover once you delete a
                reservation. Do you really want to delete? 🙄`}
          />
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <ButtonContainer>
            <RedButton onClick={onClickDeleteYesHandler}>Yes</RedButton>
            <GreenButton onClick={onClickDeleteNoHandler}>No</GreenButton>
          </ButtonContainer>
        </>
      ) : null}
      {update ? (
        <UpdateReservation
          onSuccess={props.onSuccess}
          date={props.date}
          reservation={props.reservation}
        />
      ) : null}
    </>
  );
};

export default ConfirmedReservation;
