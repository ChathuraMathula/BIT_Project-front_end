import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GreenButton from "../components/UI/buttons/GreenButton";
import LoginButton from "../components/UI/buttons/LoginButton";
import ButtonContainer from "../components/UI/containers/ButtonContainer";
import LoginCardContainer from "../components/UI/containers/LoginCardContainer";
import NormalCardContainer from "../components/UI/containers/NormalCardContainer";
import WarningContainer from "../components/UI/containers/WarningContainer";
import PadlockSVG from "../components/UI/SVG/PadlockSVG";
import CardContainerTitle from "../components/UI/titles/CardContainerTitle";
import { isValid } from "../utils/Validator";

import "./Login.css";
import UsernameInput from "../components/UI/inputs/UsernameInput";
import PasswordInput from "../components/UI/inputs/PasswordInput";

const Login = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");
  const [isSentEmail, setIsSentEmail] = useState(false);

  const onChangeUsernameHandler = (usernameText) => {
    setUsername(usernameText);
  };

  const onChangePasswordHandler = (passwordText) => {
    setPassword(passwordText);
  };

  const displayWarning = (message) => {
    setWarningStyles("login-form-warning__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const onClickLoginHandler = async () => {
    setUsername(username.trim());
    setPassword(password.trim());

    if (!username || !password) {
      displayWarning("Please enter a valid username and password.");
    } else if (
      !isValid("username", username) ||
      !isValid("password", password)
    ) {
      displayWarning("Username or password not valid. Please check again.");
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

            navigate("/dashboard", { replace: true });
          }
        })
        .catch((error) => {
          if (error) {
            displayWarning("User login error... Please try again.");
          }
        });
    }
  };

  const onClickForgotPasswordHandler = async (event) => {
    if (username) {
      await fetch("http://localhost:3001/forgot/password", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ username: username }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsSentEmail(true);
          } else {
            displayWarning(
              "Sending reset link failed. Please try again later."
            );
          }
        });
    } else {
      displayWarning(
        "Please add a valid username to generate a password reset link."
      );
    }
  };

  const onClickOkHandler = (e) => {
    setIsSentEmail(false);
  };

  return (
    <>
      {!isSentEmail ? (
        <LoginCardContainer>
          <CardContainerTitle>LOGIN</CardContainerTitle>
          <UsernameInput
            name="Username"
            onChange={onChangeUsernameHandler}
            placeholder="johndoe12"
          />
          <PasswordInput
            name="Password"
            onChange={onChangePasswordHandler}
            placeholder="Your password"
          />
          <div
            onClick={onClickForgotPasswordHandler}
            className="forgot-password-button__container"
          >
            <div>
              <PadlockSVG />
            </div>
            <div>Forgot Password</div>
          </div>
          <div className={"login-form-action__message " + warningStyles}>
            {warningMessage}
          </div>
          <LoginButton onClick={onClickLoginHandler}>Login</LoginButton>
        </LoginCardContainer>
      ) : isSentEmail ? (
        <>
          <NormalCardContainer>
            <CardContainerTitle>NOTICE..!</CardContainerTitle>
            <WarningContainer>
              Password reset link is sent to your email. Please check your
              inbox.
            </WarningContainer>
            <ButtonContainer>
              <GreenButton onClick={onClickOkHandler}>Ok</GreenButton>
            </ButtonContainer>
          </NormalCardContainer>
        </>
      ) : null}
    </>
  );
};

export default Login;
