import React, { useContext } from "react";
import AdminPortfolio from "../components/user/admin/portfolio/AdminPortfolio";
import { UserLoginContext } from "../context/Context";

const Portfolio = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user.role === "admin") {
    return (
      <>
        <AdminPortfolio />
      </>
    );
  }
};

export default Portfolio;
