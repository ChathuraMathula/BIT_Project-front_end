import React from "react";
import "./SignUp.css";
import CustomerRegistrationForm from "../components/customer/CustomerRegistrationForm";

// This component renders all the features related to sign up process including customer registration form
// path = "/sign-up"

const SignUp = (props) => {
  return (
    <>
      <CustomerRegistrationForm />
    </>
  );
};

export default SignUp;
