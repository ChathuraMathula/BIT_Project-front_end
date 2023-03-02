import React, { useEffect, useState } from "react";
import { sanitize } from "../../utils/Sanitizer";
import { isValid } from "../../utils/Validator";
import FormActionButton from "../UI/form/FormActionButton";
import FormContainer from "../UI/form/FormContainer";
import FormInput from "../UI/form/FormInput";
import FormSubHeading from "../UI/form/FormSubHeading";
import "./UserProfileDetails.css";

const UserProfileDetails = (props) => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const [emailWarning, setEmailWarning] = useState("");
  const [phoneNoWarning, setPhoneNoWarning] = useState("");
  const [addressWarning, setAddressWarning] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userDocument) => {
        if (userDocument) {
          setEmail(userDocument.email);
          setPhoneNo(userDocument.phoneNo);
          setAddress(userDocument.address);
        }
      });
  }, []);

  const displayWarning = (message) => {
    setWarningStyles("login-form-warning__red");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const emailInputHandler = (event) => {
    setEmail(sanitize(event.target.value));
    if (!isValid("email", event.target.value)) {
      setEmailWarning("✉ Invalid Email.");
    } else {
      setEmailWarning("");
    }
  };

  const phoneNoInputHandler = (event) => {
    setPhoneNo(sanitize(event.target.value));
    if (!isValid("phoneNo", event.target.value)) {
      setPhoneNoWarning("✆ Invalid Phone Number.");
    } else {
      setPhoneNoWarning("");
    }
  };

  const addressInputHandler = (event) => {
    setAddress(sanitize(event.target.value));
    if (!isValid("address", event.target.value)) {
      setAddressWarning("🏘 Invalid Address.");
    } else {
      setAddressWarning("");
    }
  };

  return (
    <FormContainer>
      <FormSubHeading>CONTACT DETAILS</FormSubHeading>
      <FormInput
        className="user-profile-details__input"
        type="text"
        id="email"
        name="email"
        validateType="email"
        placeholder="example@gmail.com"
        value={email}
        onChange={emailInputHandler}
        warning={emailWarning}
      >
        Email:
      </FormInput>
      <FormInput
        className="user-profile-details__input"
        type="text"
        id="phoneNo"
        name="phoneNo"
        validateType="phoneNo"
        placeholder="070-XXXXXXX"
        value={phoneNo}
        onChange={phoneNoInputHandler}
        warning={phoneNoWarning}
      >
        Phone No:
      </FormInput>
      <FormInput
        className="user-profile-details__input"
        type="text"
        id="address"
        name="address"
        validateType="address"
        placeholder="No 35, Kurunegala Rd, Polgahawela"
        value={address}
        onChange={addressInputHandler}
        warning={addressWarning}
      >
        Address:
      </FormInput>
      <div className={"warning-msg__container " + warningStyles}>
        {warningMessage}
      </div>
      <div className="user-profile-details__action">
        {/* <FormActionButton>REMOVE</FormActionButton> */}
        <FormActionButton>SAVE CHANGES</FormActionButton>
      </div>
    </FormContainer>
  );
};

export default UserProfileDetails;
