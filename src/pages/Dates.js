import React, { useContext } from "react";
import AdminDates from "../components/user/admin/dates/AdminDates";
import { UserLoginContext } from "../context/Context";

const Dates = () => {
  const login = useContext(UserLoginContext);

  if (login.user.name === "admin") {
    return (
      <>
        <AdminDates />
      </>
    );
  }
};

export default Dates;
