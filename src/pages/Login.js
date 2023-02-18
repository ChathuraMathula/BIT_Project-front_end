import React, { useState } from "react";
import FormActionButton from "../components/UI/form/FormActionButton";
import FormContainer from "../components/UI/form/FormContainer";
import FormHeading from "../components/UI/form/FormHeading";
import FormInput from "../components/UI/form/FormInput";
// import { UserLoginContext } from "../context/Context";
import "./Login.css";

const Login = (props) => {
  let userLoginData = {};

  const inputValuesHandler = (inputValues) => {
    userLoginData = {...userLoginData, ...inputValues};
    console.log(userLoginData);
  };

  const onClickHandler = () => {

  };

  return (
    <div className="login-form__container">
        <FormContainer>
          <FormHeading>Login</FormHeading>
          <div className="login-form-inputs__container">
            <FormInput
              value={inputValuesHandler}
              validateType="username"
              required={true}
              name="username"
              id="username"
              type="text"
              placeholder="janakaran12"
            >
              Username:
            </FormInput>
            <FormInput
              value={inputValuesHandler}
              validateType="password"
              required={true}
              name="password"
              id="password"
              type="password"
              placeholder="your password"
            >
              Password:
            </FormInput>
          </div>
          <div className="login-form-action__message"></div>
          <div className="login-form-action-btn__container">
            <FormActionButton to="/">Cancel</FormActionButton>
            <FormActionButton onClick={onClickHandler}>Login</FormActionButton>
          </div>
        </FormContainer>
    </div>
  );
};

export default Login;
