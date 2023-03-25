import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../context/Context";
import "./HeaderOptions.css";
import GeneralNav from "./navigation/GeneralNav";
import AdminNav from "./navigation/AdminNav";
import PhotograpehrNav from "./navigation/PhotographerNav";
import CustomerNav from "./navigation/CustomerNav";
import useLocalStorage from "../../hooks/useLocalStorage";
import useLoginContext from "../../hooks/useLoginContext";

/*
    This component renders the Option links in Main Header based on the login state and user
*/
const HeaderOptions = (props) => {
  const login = useContext(UserLoginContext);

  console.log("Inside HeaderOptions.js: ", login);

  if (login?.isLogged) {
    if (login.user.role === "admin") {
      return (
        <>
          <AdminNav />
        </>
      );
    } else if (login.user.role === "photographer") {
      return (
        <>
          <PhotograpehrNav />
        </>
      );
    } else if (login.user.role === "customer") {
      return (
        <>
          <CustomerNav />
        </>
      );
    }
  } else {
    return (
      <>
        <GeneralNav />
      </>
    );
  }
};

export default HeaderOptions;
