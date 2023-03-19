import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../../context/Context";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import "./ConfirmedReservation.css";

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

          const packageArray = packageCategory[0].packages.filter(
            (packageDoc) => packageDoc.name === props.reservation.package
          );

          setPackageDocument(packageArray[0]);
        }
      });
  }, []);

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

  return (
    <>
      <CalenderDateState>Reserved</CalenderDateState>
      {!deleteReservation ? (
        <>
          <ModalCardContainer>
            <div className="confirmed-reservation-details__container">
              <h2>EVENT DETAILS</h2>
              <div>
                <span>Event Type: </span>
                {reservation.event.type}
              </div>
              <div>
                <span>Event Location: </span>
                {reservation.event.location}
              </div>
              <div>
                <span>Event Time: </span>
                {`From ${reservation.event.beginTime} to ${reservation.event.endTime}`}
              </div>
            </div>
            {login.user.name === "admin" ||
            login.user.name === "photographer" ? (
              <div className="confirmed-reservation-details__container">
                <h2>CUSTOMER DETAILS</h2>
                <div>
                  <span>Name: </span>
                  {`${customer.firstname} ${customer.lastname}`}
                </div>
                <div>
                  <span>Phone No: </span>
                  {customer.phoneNo}
                </div>
                <div>
                  <span>Email: </span>
                  {customer.email}
                </div>
                <div>
                  <span>Address: </span>
                  {customer.address}
                </div>
              </div>
            ) : null}
            <div className="confirmed-reservation-details__container">
              <h2>RESERVATION DETAILS</h2>
              <div>
                <span>Package: </span>
                {packageDocument.name}
              </div>
              <div>
                <span>Services: </span> <br />
                {packageDocument.services.map((service, index) => {
                  return <li key={index}>{service}</li>;
                })}
              </div>
              <div>
                <span>Estimated Total Cost: </span>
                {+reservation.costs.transport +
                  +reservation.costs.extraServices +
                  +reservation.costs.package}{" "}
                LKR
              </div>
              <div>
                <span>Advance Payment: </span>
                {+reservation.costs.advance} LKR
              </div>
            </div>
          </ModalCardContainer>
          {login.user.name === "admin" ? (
            <>
              <div
                onClick={onClickDeleteHandler}
                className="resrvation-delete-button"
              >
                Delete Reservation
              </div>
            </>
          ) : null}
        </>
      ) : null}
      {deleteReservation ? (
        <>
          <ModalCardContainer>
            <div className="delete-reservation-warning__container">
              <h2>WARNING...! ⚠</h2>
              <div>
                Please make sure that you cannot recover once you delete a
                reservation. Do you really want to delete? 🙄
              </div>
            </div>
          </ModalCardContainer>
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <div>
            <div className="delete-action-button__container">
              <button
                onClick={onClickDeleteYesHandler}
                className="delete-yes__button"
              >
                Yes
              </button>
              <button
                onClick={onClickDeleteNoHandler}
                className="delete-no__button"
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

export default ConfirmedReservation;
