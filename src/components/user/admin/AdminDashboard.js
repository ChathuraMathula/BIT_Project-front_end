import React from "react";
import DatePicker from "../../UI/calender/DatePicker";
import CardContainer from "../../UI/containers/CardContainer";
import FormHeading from "../../UI/form/FormHeading";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import ReservationCounter from "./reservation/ReservationCounter";

const AdminDashboard = () => {
  return (
    <>
      <CardContainerTitle>DASHBOARD</CardContainerTitle>
      <CardContainer>
        <ReservationCounter />
      </CardContainer>
      <DatePicker />
    </>
  );
};

export default AdminDashboard;
