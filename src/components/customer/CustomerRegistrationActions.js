import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Validator from "../../utils/Validator";
import FormActionButton from "../UI/form/FormActionButton";
import FormInputCheckBox from "../UI/form/FormInputCheckBox";
import "./CustomerRegistrationActions.css";
import { CustomerRegistrationContext } from "../../context/Context";
import Fetcher from "../../utils/Fetcher";
import { toFormData } from "../../utils/Utils";

const CustomerRegistrationActions = (props) => {
  const customerData = useContext(CustomerRegistrationContext);

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [usernameWarningMsg, setUsernameWarningMsg] = useState("");
  const [passwordWarningMsg, setPasswordWarningMsg] = useState("");
  const [emptyWarningMsg, setEmptyWarningMsg] = useState("");
  const [uncheckedWarningMsg, setUncheckedWarningMsg] = useState("");
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isRequiredFieldsNotEmpty, setIsRequiredFieldsNotEmpty] =
    useState(false);


  const isCheckedHandler = (isChecked) => setIsChecked(isChecked);

  const password = customerData["password"];
  const confirmedPassword = customerData["confirmedPassword"];
  const requiredFields = [
    "firstname",
    "lastname",
    "phoneNo",
    "address",
    "username",
    "password",
    "email",
  ];

  // give a warning message if user enters an already existing username
  const usernameWarning = async () => {
    Validator.isExistingUser(customerData["username"]).then((isExisting) => {
      if (isExisting) {
        setUsernameWarningMsg(
          "Username you entered already exists. Please try another one. "
        );
      } else {
        setUsernameWarningMsg("");
      }
    });
  };

  // give a warning if both password and confirm password fields do not match
  const passwordWarning = async () => {
    if (Validator.isPasswordConfirmed(password, confirmedPassword)) {
      setPasswordWarningMsg("");
      setIsPasswordConfirmed(true);
    } else {
      setPasswordWarningMsg("Both passwords you entered must be same. ");
      setIsPasswordConfirmed(false);
    }
  };

  // Give a warning if user does not fill any input value
  const emptyWarning = async () => {
    if (Validator.isEmptyObject(customerData)) {
      setEmptyWarningMsg("All inputs must be duly filled. ");
      setIsRequiredFieldsNotEmpty(false);
    } else if (Validator.isRequiredFieldsEmpty(customerData, requiredFields)) {
      setEmptyWarningMsg("All inputs must be duly filled. ");
      setIsRequiredFieldsNotEmpty(false);
    } else {
      setEmptyWarningMsg("");
      setIsRequiredFieldsNotEmpty(true);
    }
  };

  /* ------------------------------------------------------------------------------------
     ------------------------------------------------------------------------------------ 
      Handles the Registration click event and post data into backend
     ------------------------------------------------------------------------------------   
     ------------------------------------------------------------------------------------ */
  const onClickHandler = (event) => {
    usernameWarning();
    passwordWarning();
    emptyWarning();

    if (isChecked) {
      setUncheckedWarningMsg("");
      Validator.isExistingUser(customerData["username"]).then((isExisting) => {
        if (!isExisting && isPasswordConfirmed && isRequiredFieldsNotEmpty) {
          // converts customerData object into a form data object
          toFormData(customerData)
            .then((formData) => Fetcher.postUser(formData))
            .then((res) => {
              console.log(res.message);
              // navigate("/login", { replace: true });
            })
            .catch((err) => console.log("error: ", err));
        }
      });
    } else {
      setUncheckedWarningMsg("Please confirm the declaration.");
    }
  };

  /** ------------------------------------------------------------------------------------ */

  return (
    <div className="customer-registration-actions__container">
      <div className={"customer-registration-actions__message"}>
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
