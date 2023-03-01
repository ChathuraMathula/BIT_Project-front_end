import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormActionButton from "../components/UI/form/FormActionButton";
import FormContainer from "../components/UI/form/FormContainer";
import FormHeading from "../components/UI/form/FormHeading";
import FormInput from "../components/UI/form/FormInput";
import useLocalStorage from "../hooks/useLocalStorage";
import { postLogin } from "../utils/post";
import { sanitize } from "../utils/Sanitizer";
import { isValid } from "../utils/Validator";

import "./Login.css";

const Login = (props) => {
  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const onChangeUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const displayWarning = (message) => {
    setWarningStyles("login-form-warning__red");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const onClickLoginHandler = async () => {
    setUsername(sanitize(username.trim()));
    setPassword(sanitize(password.trim()));

    if (!isValid("username", username) && !isValid("password", password)) {
      displayWarning("Username or password not valid. 🙁 Please check again.");
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      await fetch("http://localhost:3001/login", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            displayWarning(data.error);
          } else if (data.user) {
            props.user(data);
            console.log("inside login.js: ", data);

            // setLogin({ isLogged: true, user: data.user });
            // localStorage.setItem(
            //   "login",
            //   JSON.stringify({ isLogged: true, user: data.user })
            // );
            // console.log(login);
            navigate("/dashboard", { replace: true });
            // window.location.replace("/");
          }
        })
        .catch((error) => {
          if (error) {
            displayWarning("User login error... 😢 Please try again.");
          }
        });
    }
  };

  return (
    <div className="login-form__container">
      <FormContainer>
        <FormHeading>LOGIN</FormHeading>
        <div className="login-form-inputs__container">
          <FormInput
            onChange={onChangeUsernameHandler}
            value={username}
            name="username"
            id="username"
            type="text"
            placeholder="janakaran12"
          >
            Username:
          </FormInput>
          <FormInput
            onChange={onChangePasswordHandler}
            value={password}
            name="password"
            id="password"
            type="password"
            placeholder="your password"
          >
            Password:
          </FormInput>
        </div>
        <div className={"login-form-action__message " + warningStyles}>
          {warningMessage}
        </div>
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
