import React from "react";
import DatePicker from "../../UI/calender/DatePicker";
import CardContainer from "../../UI/containers/CardContainer";
import FormHeading from "../../UI/form/FormHeading";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";

const PhotographerDashboard = () => {
  return (
    <>
      <CardContainerTitle>DASHBOARD</CardContainerTitle>
      <DatePicker />
    </>
  );
};

export default PhotographerDashboard;
