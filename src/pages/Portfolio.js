import React, { useContext } from "react";
import FormHeading from "../components/UI/form/FormHeading";
import PortfolioImagesGallary from "../components/UI/gallary/PortfolioImagesGallary";
import CardContainerTitle from "../components/UI/titles/CardContainerTitle";
import AdminPortfolio from "../components/user/admin/portfolio/AdminPortfolio";
import { UserLoginContext } from "../context/Context";

const Portfolio = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user?.role === "admin") {
    return (
      <>
        <CardContainerTitle>PORTFOLIO</CardContainerTitle>
        <AdminPortfolio />
      </>
    );
  } else {
    return (
      <>
        <CardContainerTitle>PORTFOLIO</CardContainerTitle>
        <PortfolioImagesGallary />
      </>
    );
  }
};

export default Portfolio;
