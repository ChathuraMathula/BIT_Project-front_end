import React from "react";
import DatePicker from "../../UI/calender/DatePicker";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import CounterContainer from "../../UI/containers/CounterContainer";
import ReservationCounter from "../admin/reservation/ReservationCounter";

const PhotographerDashboard = () => {
  return (
    <>
      <CardContainerTitle>DASHBOARD</CardContainerTitle>
      <CounterContainer>
        <ReservationCounter />
      </CounterContainer>
      <DatePicker />
    </>
  );
};

export default PhotographerDashboard;
