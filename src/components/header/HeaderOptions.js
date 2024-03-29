import React, { useContext } from "react";
import { UserLoginContext } from "../../context/Context";
import FlexCenterRowContainer from "../UI/containers/FlexCenterRowContainer";
import NotificationMain from "../UI/notification/NotificationMain";
import "./HeaderOptions.css";
import AdminNav from "./navigation/AdminNav";
import CustomerNav from "./navigation/CustomerNav";
import GeneralNav from "./navigation/GeneralNav";
import PhotograpehrNav from "./navigation/PhotographerNav";

/*
    This component renders the Option links in Main Header based on the login state and user
*/
const HeaderOptions = (props) => {
  const login = useContext(UserLoginContext);

  if (login?.isLogged) {
    if (login.user.role === "admin") {
      return (
        <>
          <FlexCenterRowContainer>
            <NotificationMain />
            <AdminNav />
          </FlexCenterRowContainer>
        </>
      );
    } else if (login.user.role === "photographer") {
      return (
        <>
          <FlexCenterRowContainer>
            <NotificationMain />
            <PhotograpehrNav />
          </FlexCenterRowContainer>
        </>
      );
    } else if (login.user.role === "customer") {
      return (
        <>
          <FlexCenterRowContainer>
            <NotificationMain />
            <CustomerNav />
          </FlexCenterRowContainer>
        </>
      );
    }
  } else {
    return (
      <>
        <GeneralNav />
      </>
    );
  }
};

export default HeaderOptions;
