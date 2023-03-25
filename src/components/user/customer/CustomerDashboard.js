import React from "react";
import DatePicker from "../../UI/calender/DatePicker";
import FormHeading from "../../UI/form/FormHeading";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";

const CustomerDashboard = (props) => {
  return (
    <>
      <CardContainerTitle>DASHBOARD</CardContainerTitle>
      <DatePicker />
    </>
  );
};

export default CustomerDashboard;
