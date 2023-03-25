import React from "react";
import DatePicker from "../components/UI/calender/DatePicker";
import CardContainerTitle from "../components/UI/titles/CardContainerTitle";

const Dates = () => {
  return (
    <>
      <CardContainerTitle>AVAILABLE DATES</CardContainerTitle>
      <DatePicker />
    </>
  );
};

export default Dates;
