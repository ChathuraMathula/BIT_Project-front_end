import React from "react";
import { useNavigate } from "react-router-dom";
import FlexCenterRowContainer from "../../UI/containers/FlexCenterRowContainer";
import "./GeneralNav.css";

// This component renders the header navigation links that are general to all users

const GeneralNav = (props) => {
  const navigate = useNavigate();

  const onClickNavigateToSignUpHandler = (event) => {
    navigate("/sign-up", { replace: true });
  };
  const onClickNavigateToLoginHandler = (event) => {
    navigate("/login", { replace: true });
  };

  return (
    <>
      <FlexCenterRowContainer>
        <div
          onClick={onClickNavigateToSignUpHandler}
          className="header-sign-up__button"
        >
          Sign Up
        </div>
        <div
          onClick={onClickNavigateToLoginHandler}
          className="header-login__button"
        >
          Login
        </div>
      </FlexCenterRowContainer>
    </>
  );
};

export default GeneralNav;
