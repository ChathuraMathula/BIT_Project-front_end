import React, { useState } from "react";
import { sanitize } from "../../utils/Sanitizer";
import { isValid } from "../../utils/Validator";
import FormActionButton from "../UI/form/FormActionButton";
import FormContainer from "../UI/form/FormContainer";
import FormInput from "../UI/form/FormInput";
import FormSubHeading from "../UI/form/FormSubHeading";
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

  const onClickSavePassword = (event) => {
    event.preventDefault();

  }

  return (
    <FormContainer>
      <FormSubHeading>CHANGE PASSWORD</FormSubHeading>
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
      <div className="user-profile-password__action">
        <FormActionButton onClick={onClickSavePassword}>SAVE CHANGES</FormActionButton>
      </div>
    </FormContainer>
  );
};

export default UserProfilePassword;
