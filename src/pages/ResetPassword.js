import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GreenButton from "../components/UI/buttons/GreenButton";
import ButtonContainer from "../components/UI/containers/ButtonContainer";
import CardContainer from "../components/UI/containers/CardContainer";
import FlexCenterColumnContainer from "../components/UI/containers/FlexCenterColumnContainer";
import PasswordInput from "../components/UI/inputs/PasswordInput";
import CardContainerTitle from "../components/UI/titles/CardContainerTitle";
import WarningMessageBox from "../components/UI/warnings/WarningMessageBox";
import useWarningMessage from "../hooks/useWarningMessage";
import "./ResetPassword.css";

const ResetPassword = (props) => {
  const params = useParams();
  const [verified, setVerified] = useState(false);

  const [warningMessage, setWarningMessage] = useWarningMessage("");

  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token: ", params.token);
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
        console.log("Data: ", data)
        if (data.success) {
          setVerified(true);
        } else {
          navigate("/reset/password/failed", {replace: true})
        }
      }).catch((error) => {
        if (error) {
          navigate("/reset/password/failed", {replace: true})
        }
      });
  }, []);

  const onChangePasswordHandler = (passwordText) => {
    setPassword(passwordText);
  };

  const onChangeConfirmedPasswordHandler = (passwordText) => {
    setConfirmedPassword(passwordText);
  };

  const onClickResetPassword = async (event) => {
    try {
      if (!password && !confirmedPassword) {
        setWarningMessage(
          "Both fields cannot be empty. please enter valid passwords."
        );
      } else if (password === "invalid" || confirmedPassword === "invalid") {
        setWarningMessage("Both passwords must be valid. please check again.");
      } else if (password !== confirmedPassword) {
        setWarningMessage(
          "Both passwords must be same. please check again."
        );
      } else {
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
              setWarningMessage("Reset password failed.");
            }
          });
      }
    } catch (error) {
      setWarningMessage("Reset password failed.");
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
            <WarningMessageBox message={warningMessage} />
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
