import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationButton from "../../UI/buttons/NavigationButton";
import UserNavigation from "../../UI/navigation/UserNavigation";
import "./AdminNav.css";

const AdminNav = (props) => {

  return (
    <>
      <UserNavigation>
        <NavigationButton to="/dashboard">Dashboard</NavigationButton>
        <NavigationButton to="/profile">Profile</NavigationButton>
        <NavigationButton to="/photographer">Photographer</NavigationButton>
        <NavigationButton to="/packages">Packages</NavigationButton>
        <NavigationButton to="/portfolio">Portfolio</NavigationButton>
      </UserNavigation>
    </>
  );
};

export default AdminNav;
