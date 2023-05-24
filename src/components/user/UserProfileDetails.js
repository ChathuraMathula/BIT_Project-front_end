import React, { useEffect, useState } from "react";
import { isEmpty } from "../../utils/validator";
import GreenButton from "../UI/buttons/GreenButton";
import ButtonContainer from "../UI/containers/ButtonContainer";
import CardContainer from "../UI/containers/CardContainer";
import FlexCenterColumnContainer from "../UI/containers/FlexCenterColumnContainer";
import AddressInput from "../UI/inputs/AddressInput";
import EmailInput from "../UI/inputs/EmailInput";
import PhoneInput from "../UI/inputs/PhoneInput";
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
  const [initialEmail, setInitialEmail] = useState("");
  const [initialPhoneNo, setInitialPhoneNo] = useState("");
  const [initialAddress, setInitialAddress] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

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
            setInitialEmail(userDocument.email);
            setInitialPhoneNo(userDocument.phoneNo);
            setInitialAddress(userDocument.address);
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

  const emailInputHandler = (emailText) => {
    setEmail(emailText);
  };

  const phoneNoInputHandler = (phoneNoText) => {
    setPhoneNo(phoneNoText);
  };

  const addressInputHandler = (address) => {
    setAddress(address);
  };

  const onClickSaveHandler = async (event) => {
    event.preventDefault();

    if (props.user) {
      if (
        email !== "invalid" &&
        phoneNo !== "invalid" &&
        address !== "invalid" &&
        !isEmpty(email) &&
        !isEmpty(phoneNo) &&
        !isEmpty(address)
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
              displayError("Sorry...! Save failed.");
            }
          });
      } else {
        displayError("Input data is invalid. Please check again.");
      }
    }
  };

  return (
    <CardContainer>
      <CardContainerTitle>CONTACT DETAILS</CardContainerTitle>
      <FlexCenterColumnContainer>
        <EmailInput
          name="Email"
          value={initialEmail}
          onChange={emailInputHandler}
        />
        <PhoneInput
          name="Phone No"
          value={initialPhoneNo}
          onChange={phoneNoInputHandler}
        />
        <AddressInput
          name="Address"
          value={initialAddress}
          onChange={addressInputHandler}
        />
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
