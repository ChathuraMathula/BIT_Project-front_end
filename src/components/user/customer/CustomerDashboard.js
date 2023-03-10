import React from "react";
import DatePicker from "../../UI/calender/DatePicker";
import FormHeading from "../../UI/form/FormHeading";

const CustomerDashboard = (props) => {
  return (
    <>
      <FormHeading>DASHBOARD</FormHeading>
      <DatePicker />
    </>
  );
};

export default CustomerDashboard;
