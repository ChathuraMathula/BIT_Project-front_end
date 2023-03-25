import React, { useEffect, useState } from "react";
import socket from "../../../../utils/socket";
import FlexCenterRowContainer from "../../../UI/containers/FlexCenterRowContainer";
import DisplayCount from "../../../UI/other/DisplayCount";
import "./ReservationCounter.css";

const ReservationCounter = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [dates, setDates] = useState([]);

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
        if (dateDocument.hasOwnProperty("reservation")) {
          const reservation = dateDocument.reservation;
          if (reservation.state === "confirmed") {
            confirmedRequests++;
          } else if (reservation.state === "pending") {
            pendingRequests++;
            if (!reservation.hasOwnProperty("costs")) {
              newRequests++;
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
      <FlexCenterRowContainer>
        <DisplayCount count={newCount} name="New" />
        <DisplayCount count={pendingCount} name="Pending" />
        <DisplayCount count={confirmedCount} name="Confirmed" />
      </FlexCenterRowContainer>
    </>
  );
};

export default ReservationCounter;
