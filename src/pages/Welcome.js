import React, { useContext } from "react";
import WelcomeCard from "../components/UI/cards/WelcomeCard";
import CardContainerTitle from "../components/UI/titles/CardContainerTitle";
import { UserLoginContext } from "../context/Context";
import "./Welcome.css";

// This component renders the welcome page componenets

const Welcome = () => {
  const login = useContext(UserLoginContext);

  return (
    <>
      {/* <CardContainerTitle>WELCOME</CardContainerTitle> */}
      <WelcomeCard />
    </>
  );
};

export default Welcome;
