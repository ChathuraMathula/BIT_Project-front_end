import React, { useContext } from "react";
import { UserLoginContext } from "../../context/Context";
import CardContainerTitle from "../UI/titles/CardContainerTitle";
import "./UserProfile.css";
import UserProfileDetails from "./UserProfileDetails";
import UserProfilePassword from "./UserProfilePassword";
import UserProfilePicture from "./UserProfilePicture";

const UserProfile = (props) => {
  const login = useContext(UserLoginContext);
 
  return (
    <>
      <CardContainerTitle>PROFILE</CardContainerTitle>

      <UserProfilePicture user={login.user} />
      <UserProfileDetails user={login.user} />
      <UserProfilePassword user={login.user} />
    </>
  );
};

export default UserProfile;
