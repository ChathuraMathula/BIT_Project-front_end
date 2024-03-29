import React, { useEffect, useState } from "react";
import socket from "../../../../utils/socket";
import FlexCenterRowContainer from "../../../UI/containers/FlexCenterRowContainer";
import DisplayCount from "../../../UI/other/DisplayCount";
import CardContainerTitle from "../../../UI/titles/CardContainerTitle";
import "./ReservationCounter.css";

const ReservationCounter = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [dates, setDates] = useState([]);

  const today = new Date();

  useEffect(() => {
    fetch("http://localhost:3001/available/dates")
      .then((res) => res.json())
      .then((dateDocuments) => {
        if (dateDocuments) {
          setDates([...dateDocuments]);
        }
      });

    socket.on("dates", (dateDocuments) => {
      if (dateDocuments) {
        setDates([...dateDocuments]);
      }
    });
  }, []);

  useEffect(() => {
    if (dates.length > 0) {
      let newRequests = 0;
      let pendingRequests = 0;
      let confirmedRequests = 0;

      for (let dateDocument of dates) {
        const currentDate = new Date(
          dateDocument.date.year,
          dateDocument.date.month,
          dateDocument.date.day
        );

        if (currentDate > today) {
          console.log("------==>>> ", dateDocument);
          if (dateDocument.hasOwnProperty("reservation")) {
            const reservation = dateDocument.reservation;
            if (reservation.state === "confirmed") {
              confirmedRequests++;
            }
            if (reservation.state === "pending") {
              pendingRequests++;
              if (!reservation.hasOwnProperty("costs")) {
                newRequests++;
              }
            }
          }
        }
      }

      setConfirmedCount(confirmedRequests);
      setPendingCount(pendingRequests);
      setNewCount(newRequests);
    }
  }, [dates]);
  return (
    <>
      <CardContainerTitle>RESERVATIONS</CardContainerTitle>
      <FlexCenterRowContainer>
        <DisplayCount count={newCount} name="New" />
        <DisplayCount count={pendingCount} name="Pending" />
        <DisplayCount count={confirmedCount} name="Confirmed" />
      </FlexCenterRowContainer>
    </>
  );
};

export default ReservationCounter;
