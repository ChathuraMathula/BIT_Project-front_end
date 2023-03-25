import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationButton from "../../UI/buttons/NavigationButton";
import UserNavigation from "../../UI/navigation/UserNavigation";
import "./CustomerNav.css";

const CustomerNav = (props) => {
  return (
    <>
      <UserNavigation>
        <NavigationButton to="/dashboard">Dashboard</NavigationButton>
        <NavigationButton to="/profile">Profile</NavigationButton>
      </UserNavigation>
    </>
  );
};

export default CustomerNav;
