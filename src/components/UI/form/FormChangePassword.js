import React from "react";
import "./FormChangePassword.css";
import FormInput from "./FormInput";

const FormChangePassword = (props) => {


  const inputValuesHandler = (inputValues) => {
    props.values({...inputValues});
  } 

  return (
    <div className="user-profile-change-password__container">
      <FormInput
        className="user-profile-change-password__input"
        type="password"
        id="oldPassword"
        name="oldPassword"
        value={inputValuesHandler}
        validateType="password"
        placeholder="Old Password"
      >
        Old Password:
      </FormInput>
      <FormInput
        className="user-profile-change-password__input"
        type="password"
        id="newPassword"
        name="newPassword"
        value={inputValuesHandler}
        validateType="password"
        placeholder="New Password"
      >
        New Password:
      </FormInput>
    </div>
  );
};

export default FormChangePassword;
