import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import FormActionButton from "../components/UI/form/FormActionButton";
import FormContainer from "../components/UI/form/FormContainer";
import FormHeading from "../components/UI/form/FormHeading";
import FormInput from "../components/UI/form/FormInput";
// import { UserLoginContext } from "../context/Context";
import { postLogin } from "../utils/post";

import "./Login.css";

const Login = (props) => {
  // const [user, setUser] = useContext(UserLoginContext);
  const [user, setUser] = useOutletContext();

  let userLoginData = {};

  const inputValuesHandler = (inputValues) => {
    userLoginData = { ...userLoginData, ...inputValues };
  };

  const onClickLoginHandler = () => {
    postLogin(userLoginData)
      .then((res) => {
        if (!res.ok) {
          throw `${res.status} = ${res.statusText}`;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setUser({
            loggedIn: true,
            role: data.user.role,
            username: data.user.name,
          });
          console.log(user);
        } else {
          return;
        }
      })
      .catch((error) => {
        console.log("ERROR: => ", error);
      });
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
          <FormActionButton onClick={onClickLoginHandler}>
            Login
          </FormActionButton>
        </div>
      </FormContainer>
    </div>
  );
};

export default Login;
