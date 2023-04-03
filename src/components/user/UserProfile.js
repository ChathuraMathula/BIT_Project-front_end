import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginContext } from "../../context/Context";
import FormActionButton from "../UI/form/FormActionButton";
import FormChangePassword from "../UI/form/FormChangePassword";
import FormContainer from "../UI/form/FormContainer";
import FormInput from "../UI/form/FormInput";
import FormUploadProfilePhoto from "../UI/form/FormUploadProfilePhoto";
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
