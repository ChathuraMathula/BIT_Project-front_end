import React from "react";
import FormContainer from "../UI/form/FormContainer";
import FormHeading from "../UI/form/FormHeading";
import FormSubHeading from "../UI/form/FormSubHeading";
import CustomerRegistrationInputs from "./CustomerRegistrationInputs";
import CustomerRegistrationActions from "./CustomerRegistrationActions";
import CustomerRegistrationProfilePhoto from "./CustomerRegistrationProfilePhoto";
import "./CustomerRegistrationForm.css";

// This component renders the customer registration form/sign up form

const CustomerRegistrationForm = (props) => {
  return (
    <>
      <div className="customer-registration-form__container">
        <FormContainer>
          <FormHeading>Customer Registration Form</FormHeading>
          <FormSubHeading>
            &#9888; Please enter your details to register as a customer
          </FormSubHeading>

          <CustomerRegistrationProfilePhoto />
          <CustomerRegistrationInputs />
          <CustomerRegistrationActions />
        </FormContainer>
      </div>
    </>
  );
};

export default CustomerRegistrationForm;
