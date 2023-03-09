import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../utils/socket";
import "./UserDateController.css";

const UserDateController = (props) => {
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const thisDay = props.date.date.getDate();
  const thisMonth = props.date.date.getMonth();
  const thisYear = props.date.date.getFullYear();

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
            if (availableDate[0].reservation) {
              setState("Reserved");
            } else {
              setState("Available");
            }
          } else {
            setState("Not Available");
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
          if (availableDate[0].reservation) {
            setState("Reserved");
          } else {
            setState("Available");
          }
        } else {
          setState("Not Available");
        }
      }
    });
  }, [props.date.date]);

  const onClickDateHandler = (event) => {
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div
        className={
          props.date.disabled ||
          state === "Not Available" ||
          state === "Reserved"
            ? "user-date-controller-object__disabled"
            : props.date.today
            ? "user-date-controller-object__today"
            : "user-date-controller__object"
        }
        onClick={onClickDateHandler}
      >
        {props.date.date.getDate()}
      </div>
    </>
  );
};

export default UserDateController;
