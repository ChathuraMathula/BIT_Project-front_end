import React from "react";
import { Link } from "react-router-dom";
import UserNavigation from "../../UI/navigation/UserNavigation";
import "./AdminNav.css";

const AdminNav = (props) => {
  return (
    <>
      <UserNavigation>
        <Link>Dashbord</Link>
        <Link>Profile</Link>
        <Link>Photographer</Link>
        <Link>Packages</Link>
        <Link>Portfolio</Link>
      </UserNavigation>
    </>
  );
};

export default AdminNav;
