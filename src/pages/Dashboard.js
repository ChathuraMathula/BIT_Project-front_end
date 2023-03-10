import React, { useContext } from "react";
import { UserLoginContext } from "../context/Context";
import AdminDashboard from "../components/user/admin/AdminDashboard";
import CustomerDashboard from "../components/user/customer/CustomerDashboard";
import PhotographerDashboard from "../components/user/photographer/PhotographerDashboard";

const Dashboard = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user.role === "admin") {
    return (
      <>
        <AdminDashboard />
      </>
    );
  } else if (login.user.role === "photographer") {
    return (
      <>
        <PhotographerDashboard />
      </>
    );
  } else if (login.user.role === "customer") {
    return (
      <>
        <CustomerDashboard />
      </>
    );
  }
};

export default Dashboard;
