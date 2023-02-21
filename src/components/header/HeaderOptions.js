import React, { useContext, useState } from "react";
import { UserLoginContext } from "../../context/Context";
import "./HeaderOptions.css";
import GeneralNav from "./navigation/GeneralNav";
import AdminNav from "./navigation/AdminNav";

/*
    This component renders the Option links in Main Header based on the login state and user
*/

const HeaderOptions = (props) => {
  const login = useContext(UserLoginContext);

  console.log("Inside HeaderOptions.js: ", login);
  // if user is not logged to the system
  if (!login.isLogged) {
    return (
      <>
        <GeneralNav />
      </>
    );
  } else if (login.isLogged) {
    if (login.user.name === "admin") {
      return (
        <>
          <AdminNav />
        </>
      );
    }
  }
};

export default HeaderOptions;
