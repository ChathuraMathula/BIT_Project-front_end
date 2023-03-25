import React, { useEffect, useState } from "react";
import { sanitize } from "../../utils/Sanitizer";
import { isValid } from "../../utils/Validator";
import GreenButton from "../UI/buttons/GreenButton";
import ButtonContainer from "../UI/containers/ButtonContainer";
import CardContainer from "../UI/containers/CardContainer";
import FlexCenterColumnContainer from "../UI/containers/FlexCenterColumnContainer";
import FormActionButton from "../UI/form/FormActionButton";
import FormContainer from "../UI/form/FormContainer";
import FormInput from "../UI/form/FormInput";
import FormSubHeading from "../UI/form/FormSubHeading";
import CardContainerTitle from "../UI/titles/CardContainerTitle";
import "./UserProfileDetails.css";

/**
 *
 * @param {object} props.user user object with name and role attributes eg: {name: "janaka", role: "customer"}
 * @returns
 */
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
    if (props.user) {
      const formData = new FormData();
      formData.append("username", props.user.name);

      fetch("http://localhost:3001/user", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
        .then((userDocument) => {
          if (userDocument) {
            setEmail(userDocument.email);
            setPhoneNo(userDocument.phoneNo);
            setAddress(userDocument.address);
          }
        });
    }
  }, []);

  const displayError = (message) => {
    setWarningStyles("warning-msg-styles__red");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const displaySuccess = (message) => {
    setWarningStyles("warning-msg-styles__green");
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

  const onClickSaveHandler = async (event) => {
    event.preventDefault();

    if (props.user) {
      if (
        isValid("email", email) &&
        isValid("phoneNo", phoneNo) &&
        isValid("address", address)
      ) {
        const formData = new FormData();
        formData.append("username", props.user.name);
        formData.append("email", email);
        formData.append("phoneNo", phoneNo);
        formData.append("address", address);

        await fetch("http://localhost:3001/user/update/contact/details", {
          method: "POST",
          credentials: "include",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (data.success) {
                displaySuccess(data.success);
              } else if (data.error) {
                displayError(data.error);
              }
            } else {
              throw "error";
            }
          })
          .catch((error) => {
            if (error) {
              displayError("Sorry...! 😟 Save failed.");
            }
          });
      } else {
        displayError("Input data is invalid. Please check again. 😡");
      }
    }
  };

  return (
    <CardContainer>
      <CardContainerTitle>CONTACT DETAILS</CardContainerTitle>
      <FlexCenterColumnContainer>
        <FormInput
          className="user-profile-details__input"
          type="text"
          id="email"
          name="email"
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
          placeholder="No 35, Kurunegala Rd, Polgahawela"
          value={address}
          onChange={addressInputHandler}
          warning={addressWarning}
        >
          Address:
        </FormInput>
      </FlexCenterColumnContainer>
      <div className={"warning-msg__container " + warningStyles}>
        {warningMessage}
      </div>
      <ButtonContainer>
        <GreenButton onClick={onClickSaveHandler}>Save</GreenButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default UserProfileDetails;
