import React, { useEffect, useState } from "react";
import socket from "../../../../utils/socket";
import GreenButton from "../../../UI/buttons/GreenButton";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import Modal from "../../../UI/modal/Modal";
import ConfirmedReservation from "../reservation/ConfirmedReservation";
import ReservationRequestController from "../reservation/ReservationRequestController";
import "./AdminDateController.css";
import DateAvailabilityController from "./DateAvailabilityController";

/**
 *
 * @param {object} date date object eg: {date: Date(), disabled: boolean}
 * @returns
 */
const AdminDateController = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState("");
  const [dateDocument, setDateDocument] = useState({});

  const thisDay = props.date.date.getDate();
  const thisMonth = props.date.date.getMonth();
  const thisYear = props.date.date.getFullYear();

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const onCheckedAvailabilityHandler = (event) => {
    setChecked(event.target.checked);
  };

  const saveAvailabilityHandler = async () => {
    if (checked) {
      await fetch("http://localhost:3001/admin/add/available/date", {
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
          
          if (data.success) {
            setState("Available");
            setShowModal(false);
          } else {
            setShowModal(false);
          }
        });
    } else if (!checked) {
      await fetch("http://localhost:3001/admin/remove/available/date", {
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
          
          if (data.success) {
            setState("Not Available");
            setShowModal(false);
          }
        });
    }
  };

  const onClickDateHandler = (event) => {
    setShowModal(true);
  };

  useEffect(() => {
    fetch("http://localhost:3001/available/dates")
      .then((res) => res.json())
      .then((dates) => {
        if (dates) {
          const availableDate = dates.filter((dateDocument) => {
            return (
              dateDocument.date.year === thisYear &&
              dateDocument.date.month === thisMonth &&
              dateDocument.date.day === thisDay
            );
          });

          if (availableDate.length > 0) {
            setDateDocument(availableDate[0]);

            if (availableDate[0].reservation) {
              const reservation = availableDate[0].reservation;
              if (reservation.state === "confirmed") {
                setState("Reserved");
              } else if (reservation.state === "pending") {
                setState("Pending");
                if (
                  reservation.hasOwnProperty("costs") &&
                  !reservation.hasOwnProperty("payment")
                ) {
                  setState("Pending_orange");
                } else if (reservation.hasOwnProperty("payment")) {
                  setState("Pending_red");
                }
              }
            } else {
              setState("Available");
              setChecked(true);
            }
          } else {
            setState("Not Available");
            setChecked(false);
          }
        }
      });

    socket.on("dates", (dates) => {
      if (dates) {
        const availableDate = dates.filter((dateDocument) => {
          return (
            dateDocument.date.year === thisYear &&
            dateDocument.date.month === thisMonth &&
            dateDocument.date.day === thisDay
          );
        });

        if (availableDate.length > 0) {
          setDateDocument(availableDate[0]);

          if (availableDate[0].reservation) {
            const reservation = availableDate[0].reservation;
            if (reservation.state === "confirmed") {
              setState("Reserved");
            } else if (reservation.state === "pending") {
              setState("Pending");
              if (
                reservation.hasOwnProperty("costs") &&
                !reservation.hasOwnProperty("payment")
              ) {
                setState("Pending_orange");
              } else if (reservation.hasOwnProperty("payment")) {
                setState("Pending_red");
              }
            }
          } else {
            setState("Available");
            setChecked(true);
          }
        } else {
          setState("Not Available");
          setChecked(false);
        }
      }
    });
  }, [props.date.date]);

  const onSuccessHandler = (success) => {
    if (success) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div
        className={`admin-date-controller-object__general ${
          props.date.disabled
            ? "admin-date-controller-object__disabled"
            : props.date.today
            ? "admin-date-controller-object__today"
            : state === "Reserved"
            ? "admin-date-controller-object__reserved"
            : state === "Pending"
            ? "admin-date-controller-object__pending"
            : state === "Pending_orange"
            ? "admin-date-controller-object__pending-orange"
            : state === "Pending_red"
            ? "admin-date-controller-object__pending-red"
            : state === "Available"
            ? "admin-date-controller-object__available"
            : "admin-date-controller__object"
        }`}
        onClick={onClickDateHandler}
      >
        {props.date.date.getDate()}
      </div>
      <Modal
        show={showModal}
        onBackdropClick={closeModalHandler}
        onClose={closeModalHandler}
        heading={`${props.date.date.toDateString()}`}
      >
        {state === "Available" || state === "Not Available" ? (
          <>
            <DateAvailabilityController
              onChecked={onCheckedAvailabilityHandler}
              checked={checked}
              state={state}
            />
            <ButtonContainer>
              <GreenButton onClick={saveAvailabilityHandler}>Save</GreenButton>
            </ButtonContainer>
          </>
        ) : null}

        {state === "Pending" ||
        state === "Pending_orange" ||
        state === "Pending_red" ? (
          <ReservationRequestController
            reservation={dateDocument.reservation}
            date={props.date.date}
            onSuccess={onSuccessHandler}
          />
        ) : null}
        {state === "Reserved" ? (
          <ConfirmedReservation
            reservation={dateDocument.reservation}
            date={props.date.date}
            onSuccess={onSuccessHandler}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default AdminDateController;
