import React, { useEffect, useState } from "react";
import Modal from "../../../UI/modal/Modal";
import DateAvailabilityController from "./DateAvailabilityController";
import socket from "../../../../utils/socket";
import "./AdminDateController.css";
import ReservationRequestController from "../reservation/ReservationRequestController";

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
          console.log(data);
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
          console.log(data);
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

  const onCussessNewReservationRequestSendHandler = (success) => {
    if (success) {
      setShowModal(false);
    }
  }


  return (
    <>
      <div
        className={
          props.date.disabled
            ? "admin-date-controller-object__disabled"
            : props.date.today
            ? "admin-date-controller-object__today"
            : state === "Reserved"
            ? "admin-date-controller-object__reserved"
            : state === "Pending"
            ? "admin-date-controller-object__pending"
            : state === "Available"
            ? "admin-date-controller-object__available"
            : "admin-date-controller__object"
        }
        onClick={onClickDateHandler}
      >
        {props.date.date.getDate()}
      </div>
      <Modal
        show={showModal}
        onBackdropClick={closeModalHandler}
        onClose={closeModalHandler}
        heading={`${props.date.date.toDateString()}`}
        leftButton={
          state === "Available" || state === "Not Available"
            ? "SAVE CHANGES"
            : null
        }
        onClickLeft={
          state === "Available" || state === "Not Available"
            ? saveAvailabilityHandler
            : null
        }
      >
        {state === "Available" || state === "Not Available" ? (
          <DateAvailabilityController
            onChecked={onCheckedAvailabilityHandler}
            checked={checked}
            state={state}
          />
        ) : null}

        {state === "Pending" ? (
          <ReservationRequestController
            reservation={dateDocument.reservation}
            date={props.date.date}
            onSuccess={onCussessNewReservationRequestSendHandler}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default AdminDateController;
