import React from "react";
import FormInput from "../UI/form/FormInput";
import "./CustomerRegistrationInputs.css";

const CustomerRegistrationInputs = (props) => {
  let customerData = {role: "customer"};

  // grab customer input data from lower componenets and pass them to the higher component
  const inputValueHandler = (inputValue) => {
    customerData = { ...customerData, ...inputValue };

    if (typeof props.value === "function") {
      // pass the value to the higher component via a property called value
      props.value(customerData);
    }
  };

  return (
    <div className="customer-registration-inputs__container">
      <div className="customer-registration-inputs__container-column">
        <FormInput
          value={inputValueHandler}
          required={true}
          validateType="name"
          type="text"
          id="customer-firstname"
          name="firstname"
          placeholder="Janaka"
        >
          First Name:
        </FormInput>

        <FormInput
          value={inputValueHandler}
          required={true}
          validateType="name"
          type="text"
          id="customer-lastname"
          name="lasttname"
          placeholder="Ranasinghe"
        >
          Last Name:
        </FormInput>

        <FormInput
          value={inputValueHandler}
          required={true}
          validateType="phoneNo"
          type="text"
          id="customer-phone_number"
          name="phone_number"
          placeholder="070-XXXXXXX"
        >
          Phone No:
        </FormInput>

        <FormInput
          value={inputValueHandler}
          required={true}
          validateType="address"
          type="text"
          id="customer-address"
          name="address"
          placeholder="No 35, Kurunegala Rd, Polgahawela"
        >
          Address:
        </FormInput>
      </div>

      <div className="customer-registration-inputs__container-column">
        <FormInput
          value={inputValueHandler}
          required={true}
          validateType="username"
          type="text"
          id="customer-username"
          name="username"
          placeholder="janakaran12"
        >
          Username:
        </FormInput>

        <FormInput
          value={inputValueHandler}
          required={true}
          validateType="password"
          type="password"
          id="customer-password"
          name="password"
          placeholder="your password"
        >
          Password:
        </FormInput>

        <FormInput
          value={inputValueHandler}
          required={true}
          validateType="password"
          type="password"
          id="customer-password-confirm"
          name="password-confirm"
          placeholder="your password"
        >
          Confirm Password:
        </FormInput>

        <FormInput
          value={inputValueHandler}
          required={true}
          validateType="email"
          type="text"
          id="customer-email"
          name="email"
          placeholder="example@gmail.com"
        >
          Email:
        </FormInput>
      </div>
    </div>
  );
};

export default CustomerRegistrationInputs;
