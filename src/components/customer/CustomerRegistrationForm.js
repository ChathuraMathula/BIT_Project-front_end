import React, { createContext, useState } from "react";
import FormContainer from "../UI/form/FormContainer";
import FormHeading from "../UI/form/FormHeading";
import FormSubHeading from "../UI/form/FormSubHeading";
import CustomerRegistrationInputs from "./CustomerRegistrationInputs";
import CustomerRegistrationActions from "./CustomerRegistrationActions";
import CustomerRegistrationProfilePhoto from "./CustomerRegistrationProfilePhoto";
import "./CustomerRegistrationForm.css";

import { CustomerRegistrationContext } from "../../context/Context";

// This component renders the customer registration form/sign up form

const CustomerRegistrationForm = (props) => {
  const [customerData, setCustomerData] = useState({});

  const inputValuesHandler = (inputValues) => {
    setCustomerData({ ...customerData, ...inputValues });
  };

  return (
    <CustomerRegistrationContext.Provider value={customerData}>
      <div className="customer-registration-form__container">
        <FormContainer>
          <FormHeading>Customer Registration Form</FormHeading>
          <FormSubHeading>
            &#9888; Please enter your details to register as a customer
          </FormSubHeading>

          <CustomerRegistrationProfilePhoto />
          <CustomerRegistrationInputs value={inputValuesHandler} />
          <CustomerRegistrationActions />
        </FormContainer>
      </div>
    </CustomerRegistrationContext.Provider>
  );
};

export default CustomerRegistrationForm;
