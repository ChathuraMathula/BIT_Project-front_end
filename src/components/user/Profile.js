import React, { useContext } from "react";
import { UserLoginContext } from "../../context/Context";
import AdminProfile from "./admin/AdminProfile";
import UserProfile from "./UserProfile";

const Profile = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user.role === "admin") {
    return (
      <>
        <AdminProfile />
      </>
    );
  } else if (login.user.role === "photographer" || login.user.role === "customer") {
    return (
      <>
        <UserProfile />
      </>
    );
  }
};

export default Profile;
