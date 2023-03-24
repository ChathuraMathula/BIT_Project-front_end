import React, { useContext } from "react";
import "./Welcome.css";
import { UserLoginContext } from "../context/Context";
import WelcomeCard from "../components/UI/cards/WelcomeCard";

// This component renders the welcome page componenets

const Welcome = () => {
  const login = useContext(UserLoginContext);

  return (
    <>
      <WelcomeCard />
    </>
  );
};

export default Welcome;
