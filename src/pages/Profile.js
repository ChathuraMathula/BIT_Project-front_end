import React, { useContext } from "react";
import { UserLoginContext } from "../context/Context";
import AdminProfile from "../components/user/admin/AdminProfile";
import UserProfile from "../components/user/UserProfile";

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
