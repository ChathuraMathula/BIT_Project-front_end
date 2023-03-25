import React, { useState } from "react";
import { sanitize } from "../../utils/Sanitizer";
import { isValid } from "../../utils/Validator";
import GreenButton from "../UI/buttons/GreenButton";
import ButtonContainer from "../UI/containers/ButtonContainer";
import CardContainer from "../UI/containers/CardContainer";
import FormActionButton from "../UI/form/FormActionButton";
import FormContainer from "../UI/form/FormContainer";
import FormInput from "../UI/form/FormInput";
import FormSubHeading from "../UI/form/FormSubHeading";
import CardContainerTitle from "../UI/titles/CardContainerTitle";
import "./UserProfilePassword.css";

const UserProfilePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordWarning, setOldPasswordWarning] = useState("");
  const [newPasswordWarning, setNewPasswordWarning] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const oldPasswordHandler = (event) => {
    setOldPassword(sanitize(event.target.value));
    if (!isValid("password", event.target.value)) {
      setOldPasswordWarning("🚫 Invalid Password.");
    } else {
      setOldPasswordWarning("");
    }
  };
  const newPasswordHandler = (event) => {
    setNewPassword(sanitize(event.target.value));
    if (!isValid("password", event.target.value)) {
      setNewPasswordWarning("🚫 Invalid Password.");
    } else {
      setNewPasswordWarning("");
    }
  };

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
    }, 10000);
  };

  const onClickSavePassword = async (event) => {
    event.preventDefault();

    if (props.user) {
      if (
        isValid("password", oldPassword) &&
        isValid("password", newPassword)
      ) {
        const formData = new FormData();
        formData.append("username", props.user.name);
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);

        await fetch("http://localhost:3001/user/update/password", {
          method: "POST",
          credentials: "include",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (data.success) {
                displaySuccess(data.success);
                setOldPassword("");
                setNewPassword("");
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
    <>
      <CardContainer>
        <CardContainerTitle>CHANGE PASSWORD</CardContainerTitle>
        <div className="user-profile-password-input__container">
          <FormInput
            className="user-profile-password__input"
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="Your old password"
            value={oldPassword}
            onChange={oldPasswordHandler}
            warning={oldPasswordWarning}
          >
            Old Password:
          </FormInput>
          <FormInput
            className="user-profile-password__input"
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Your new password"
            value={newPassword}
            onChange={newPasswordHandler}
            warning={newPasswordWarning}
          >
            New Password:
          </FormInput>
        </div>
        <div className={"warning-msg__container " + warningStyles}>
          {warningMessage}
        </div>
        <ButtonContainer>
          <GreenButton onClick={onClickSavePassword}>Save</GreenButton>
        </ButtonContainer>
      </CardContainer>
    </>
  );
};

export default UserProfilePassword;
