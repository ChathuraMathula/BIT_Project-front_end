import React from "react";
import { Link } from "react-router-dom";
import UserNavigation from "../../UI/navigation/UserNavigation";

const PhotograpehrNav = (props) => {
  return (
    <>
      <UserNavigation>
        <Link>Dashbord</Link>
        <Link>Profile</Link>
      </UserNavigation>
    </>
  );
};

export default PhotograpehrNav;
