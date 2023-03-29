import React from "react";
import DatePicker from "../../UI/calender/DatePicker";
import CounterContainer from "../../UI/containers/CounterContainer";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import ReservationCounter from "./reservation/ReservationCounter";

const AdminDashboard = () => {
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

export default AdminDashboard;
