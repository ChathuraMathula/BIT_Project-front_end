import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import UserProfilePassword from "../UserProfilePassword";
import UserProfilePicture from "../UserProfilePicture";

const AdminProfile = (props) => {
  const login = useContext(UserLoginContext);
  return (
    <>
      <CardContainerTitle>
        {login.user.role.toUpperCase()} PROFILE
      </CardContainerTitle>

      <UserProfilePicture user={login.user} />
      <UserProfilePassword user={login.user} />
    </>
  );
};

export default AdminProfile;
