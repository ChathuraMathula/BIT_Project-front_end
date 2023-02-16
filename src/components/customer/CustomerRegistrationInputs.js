import React from "react";
import FormInput from "../UI/form/FormInput";
import "./CustomerRegistrationInputs.css";

const CustomerRegistrationInputs = (props) => {
  return (
    <div className="customer-registration-inputs__container">
      <div className="customer-registration-inputs__container-column">
        <FormInput
          type="text"
          id="custmer-firstname"
          name="customer_firstname"
          placeholder="Janaka"
        >
          First Name:
        </FormInput>

        <FormInput
          type="text"
          id="custmer-lasttname"
          name="customer_lasttname"
          placeholder="Ranasinghe"
        >
          Last Name:
        </FormInput>

        <FormInput
          type="text"
          id="custmer-phone_number"
          name="customer_phone_number"
          placeholder="070-XXXXXXX"
        >
          Phone No:
        </FormInput>

        <FormInput
          type="text"
          id="custmer-address"
          name="customer_address"
          placeholder="No 35, Kurunegala Rd, Polgahawela"
        >
          Address:
        </FormInput>
      </div>

      <div className="customer-registration-inputs__container-column">
        <FormInput
          type="text"
          id="custmer-username"
          name="customer_username"
          placeholder="janakaran12"
        >
          Username:
        </FormInput>

        <FormInput
          type="password"
          id="custmer-password"
          name="customer_password"
          placeholder="your password"
        >
          Password:
        </FormInput>

        <FormInput
          type="password"
          id="custmer-password-confirm"
          name="customer_password-confirm"
          placeholder="your password"
        >
          Confirm Password:
        </FormInput>

        <FormInput
          type="text"
          id="custmer-email"
          name="customer_email"
          placeholder="example@gmail.com"
        >
          Email:
        </FormInput>
      </div>
    </div>
  );
};

export default CustomerRegistrationInputs;
