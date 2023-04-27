import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GreenButton from "../components/UI/buttons/GreenButton";
import ButtonContainer from "../components/UI/containers/ButtonContainer";
import CardContainer from "../components/UI/containers/CardContainer";
import FormInput from "../components/UI/form/FormInput";
import CardContainerTitle from "../components/UI/titles/CardContainerTitle";
import { sanitize } from "../utils/Sanitizer";
import { isValid } from "../utils/Validator";
import "./ResetPassword.css";
import PasswordInput from "../components/UI/inputs/PasswordInput";
import FlexCenterColumnContainer from "../components/UI/containers/FlexCenterColumnContainer";

const ResetPassword = (props) => {
  const params = useParams();
  const [verified, setVerified] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.token);
    fetch("http://localhost:3001/verify/password/reset", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username: params.username, token: params.token }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVerified(true);
        }
      });
  }, []);

  const displayWarning = (message) => {
    setWarningStyles("warning-msg-styles__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const onChangePasswordHandler = (passwordText) => {
    setPassword(passwordText);
  };

  const onChangeConfirmedPasswordHandler = (passwordText) => {
    setConfirmedPassword(passwordText);
  };

  const onClickResetPassword = async (event) => {
    try {
      if (
        password &&
        confirmedPassword &&
        password === confirmedPassword &&
        password !== "invalid"
      ) {
        fetch("http://localhost:3001/password/reset", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            username: params.username,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              navigate("/login", { replace: true });
            } else {
              displayWarning("Reset password failed. 😐");
            }
          });
      } else {
        displayWarning("Invalid password. please check again 😐");
      }
    } catch (error) {
      displayWarning("Reset password failed. 😐");
    }
  };

  return (
    <>
      {verified ? (
        <>
          <CardContainerTitle>{`Username: ${params.username}`}</CardContainerTitle>
          <CardContainer>
            <CardContainerTitle>RESET PASSWORD</CardContainerTitle>
            <FlexCenterColumnContainer>
              <PasswordInput
                name="Password"
                placeholder="New Password"
                onChange={onChangePasswordHandler}
              />
              <PasswordInput
                name="Confirm Password"
                placeholder="Confirm New Password"
                onChange={onChangeConfirmedPasswordHandler}
              />
            </FlexCenterColumnContainer>

            <div className={"warning-msg__container " + warningStyles}>
              {warningMessage}
            </div>
            <ButtonContainer>
              <GreenButton onClick={onClickResetPassword}>Reset</GreenButton>
            </ButtonContainer>
          </CardContainer>
        </>
      ) : null}
    </>
  );
};

export default ResetPassword;
