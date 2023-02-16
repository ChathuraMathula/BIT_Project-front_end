import React from "react";
import FormActionButton from "../components/UI/form/FormActionButton";
import FormContainer from "../components/UI/form/FormContainer";
import FormHeading from "../components/UI/form/FormHeading";
import FormInput from "../components/UI/form/FormInput";
import FormInputCheckBox from "../components/UI/form/FormInputCheckBox";
import "./Login.css";

const Login = (props) => {
  return (
    <div className="login-form__container">
      <FormContainer>
        <FormHeading>Login</FormHeading>
        <div className="login-form-inputs__container">
          <FormInput id="username" type="text" placeholder="janakaran12">
            Username:
          </FormInput>
          <FormInput id="password" type="password" placeholder="your password">
            Password:
          </FormInput>
        </div>
        <div className="login-form-action-btn__container">
          <FormActionButton>Cancel</FormActionButton>
          <FormActionButton>Login</FormActionButton>
        </div>
      </FormContainer>
    </div>
  );
};

export default Login;
