import React from "react";
import FormActionButton from "../UI/form/FormActionButton";
import FormInputCheckBox from "../UI/form/FormInputCheckBox";
import "./CustomerRegistrationActions.css";

const CustomerRegistrationActions = (props) => {
  return (
    <div className="customer-registration-actions__container">
      <FormInputCheckBox accentColor="red">Confirm</FormInputCheckBox>
      <div className="customer-registration-action__declaration">
        I hereby declare that the information given above is true and accurate
        to the best of my knowledge.
      </div>
      <div className="cutomer-registration-action-button__container">
        <FormActionButton to="/">Cancel</FormActionButton>
        <FormActionButton>Register</FormActionButton>
      </div>
    </div>
  );
};

export default CustomerRegistrationActions;
