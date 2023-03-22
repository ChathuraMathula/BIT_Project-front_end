import React, { useContext } from "react";
import AdminPackages from "../components/user/admin/AdminPackages";
import UserPackages from "../components/user/UserPackages";
import { UserLoginContext } from "../context/Context";

const Packages = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user?.name === "admin") {
    return (
      <>
        <AdminPackages />
      </>
    );
  } else {
    return (
      <>
        <UserPackages />
      </>
    );
  }
};

export default Packages;
