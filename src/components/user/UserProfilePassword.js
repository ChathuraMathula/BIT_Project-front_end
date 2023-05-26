import React, { useState } from "react";
import { isEmpty } from "../../utils/validator";
import GreenButton from "../UI/buttons/GreenButton";
import ButtonContainer from "../UI/containers/ButtonContainer";
import CardContainer from "../UI/containers/CardContainer";
import FlexCenterColumnContainer from "../UI/containers/FlexCenterColumnContainer";
import PasswordInput from "../UI/inputs/PasswordInput";
import CardContainerTitle from "../UI/titles/CardContainerTitle";
import "./UserProfilePassword.css";

const UserProfilePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const oldPasswordHandler = (passwordText) => {
    setOldPassword(passwordText);
  };
  const newPasswordHandler = (passwordText) => {
    setNewPassword(passwordText);
  };
  const confirmNewPasswordHandler = (passwordText) => {
    setNewConfirmedPassword(passwordText);
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
        oldPassword !== "invalid" &&
        newPassword !== "invalid" &&
        newConfirmedPassword !== "invalid" &&
        !isEmpty(oldPassword) &&
        !isEmpty(oldPassword) &&
        !isEmpty(newConfirmedPassword)
      ) {
        if (newPassword === newConfirmedPassword) {
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
                displayError("Sorry...! Save failed.");
              }
            });
        } else {
          displayError("New password and confirmed password must be same.");
        }
      } else {
        displayError("Input data is invalid. Please check again.");
      }
    }
  };

  return (
    <>
      <CardContainer>
        <CardContainerTitle>CHANGE PASSWORD</CardContainerTitle>
          <FlexCenterColumnContainer>
            <PasswordInput
              name="Old Password"
              placeholder="Your old password"
              onChange={oldPasswordHandler}
            />
            <PasswordInput
              name="New Password"
              placeholder="Your new password"
              onChange={newPasswordHandler}
            />
            <PasswordInput
              name="Confirm New Password"
              placeholder="Your new password"
              onChange={confirmNewPasswordHandler}
            />
          </FlexCenterColumnContainer>
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
