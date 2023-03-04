import React, { useContext } from "react";
import AdminPackages from "../components/user/admin/AdminPackages";
import { UserLoginContext } from "../context/Context";

const Packages = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user.name === "admin") {
    return (
      <>
        <AdminPackages />
      </>
    );
  }
};

export default Packages;
