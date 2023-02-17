import React, { useContext, useState } from "react";
import Fetcher from "../../utils/Fetcher";
import Validator from "../../utils/Validator";
import FormActionButton from "../UI/form/FormActionButton";
import FormInputCheckBox from "../UI/form/FormInputCheckBox";
import "./CustomerRegistrationActions.css";
import { CustomerRegistrationContext } from "./CustomerRegistrationForm";

const CustomerRegistrationActions = (props) => {
  const customerData = useContext(CustomerRegistrationContext);
  const [isChecked, setIsChecked] = useState(false);
  const [usernameWarningMsg, setUsernameWarningMsg] = useState("");
  const [passwordWarningMsg, setPasswordWarningMsg] = useState("");
  const [emptyWarningMsg, setEmptyWarningMsg] = useState("");
  const [uncheckedWarningMsg, setUncheckedWarningMsg] = useState("");

  const isCheckedHandler = (isChecked) => setIsChecked(isChecked);

  // give a warning message if user enters an already existing username
  const usernameWarning = async () => {
    await Fetcher.getCustomers().then((customers) => {
      if (customers) {
        for (let customer of customers) {
          console.log(customer);
          if (customerData["username"] === customer["username"]) {
            console.log(customerData["username"] === customer["username"]);
            setUsernameWarningMsg(
              "Username you entered already exists. Please try another one. "
            );
            return;
          } else {
            setUsernameWarningMsg("");
          }
        }
      }
    });
  };

  // give a warning if both password and confirm password fields do not match
  const passwordWarning = () => {
    if (customerData["password"] !== customerData["confirmedPassword"]) {
      setPasswordWarningMsg("Your passwords must be same. ");
    } else {
      setPasswordWarningMsg("");
    }
  };

  // Give a warning if user does not fill any input value
  const emptyWarning = () => {
    if (!Object.keys(customerData).length) {
      console.log(customerData);
      setEmptyWarningMsg("Please make sure you entered all input values. ");
    } else {
      Object.keys(customerData).forEach((key) => {
        if (!customerData[key]) {
          setEmptyWarningMsg("Please make sure you entered all input values. ");
        } else {
          setEmptyWarningMsg("");
        }
      });
    }
  };

  const onClickHandler = () => {
    if (isChecked) {
      usernameWarning();
      passwordWarning();
      emptyWarning();
      setUncheckedWarningMsg("");
    } else {
      usernameWarning();
      passwordWarning();
      emptyWarning();
      setUncheckedWarningMsg("Please confirm the declaration.");
    }
  };

  return (
    <div className="customer-registration-actions__container">
      <div className="customer-registration-actions__message">
        {usernameWarningMsg +
          passwordWarningMsg +
          emptyWarningMsg +
          uncheckedWarningMsg}
      </div>
      <FormInputCheckBox accentColor="red" isChecked={isCheckedHandler}>
        Confirm
      </FormInputCheckBox>
      <div className="customer-registration-action__declaration">
        I hereby declare that the information given above is true and accurate
        to the best of my knowledge.
      </div>
      <div className="cutomer-registration-action-button__container">
        <FormActionButton to="/">Cancel</FormActionButton>
        <FormActionButton onClick={onClickHandler}>Register</FormActionButton>
      </div>
    </div>
  );
};

export default CustomerRegistrationActions;
