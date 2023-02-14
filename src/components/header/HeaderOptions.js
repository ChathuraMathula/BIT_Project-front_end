import React, { useState } from "react";
import "./HeaderOptions.css";
import GeneralNav from "./navigation/GeneralNav";

/*
    This component renders the Option links in Main Header based on the login state and user
*/

const HeaderOptions = (props) => {

  // if user is not logged to the system
  if (!props.isLogged) {
    return (
      <>
        <GeneralNav />
      </>
    );
  }
};

export default HeaderOptions;
