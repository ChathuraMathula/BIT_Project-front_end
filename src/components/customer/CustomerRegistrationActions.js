import React, { useContext } from "react";
import FormActionButton from "../UI/form/FormActionButton";
import FormInputCheckBox from "../UI/form/FormInputCheckBox";
import "./CustomerRegistrationActions.css";
import { CustomerRegistrationContext } from "./CustomerRegistrationForm";

const CustomerRegistrationActions = (props) => {

  const customerData = useContext(CustomerRegistrationContext);

  const isCheckedHandler = (isChecked) => {
    if (isChecked) {

      console.log("inside action", customerData);
    }
  };

  return (
    <div className="customer-registration-actions__container">
      <FormInputCheckBox accentColor="red" isChecked={isCheckedHandler}>
        Confirm
      </FormInputCheckBox>
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
