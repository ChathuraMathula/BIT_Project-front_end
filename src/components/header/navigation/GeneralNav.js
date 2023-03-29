import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationButton from "../../UI/buttons/NavigationButton";
import NavDropdownBtn from "../../UI/NavDropdownBtn";
import UserNavigation from "../../UI/navigation/UserNavigation";
import "./GeneralNav.css";

// This component renders the header navigation links that are general to all users

const GeneralNav = (props) => {
  return (
    <>
      <UserNavigation>
      </UserNavigation>
    </>
  );
};

export default GeneralNav;
