import React, { useContext } from "react";
import FormHeading from "../components/UI/form/FormHeading";
import PortfolioImagesGallary from "../components/UI/gallary/PortfolioImagesGallary";
import AdminPortfolio from "../components/user/admin/portfolio/AdminPortfolio";
import { UserLoginContext } from "../context/Context";

const Portfolio = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user?.role === "admin") {
    return (
      <>
        <AdminPortfolio />
      </>
    );
  } else {
    return <>
      <FormHeading>PORTFOLIO</FormHeading>
      <PortfolioImagesGallary />
    </>;
  }
};

export default Portfolio;
