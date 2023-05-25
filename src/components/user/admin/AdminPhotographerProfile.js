import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import UserProfileDetails from "../UserProfileDetails";
import UserProfilePassword from "../UserProfilePassword";
import UserProfilePicture from "../UserProfilePicture";
import UpdatePersonalDetails from "../photographer/UpdatePersonalDetails";

const AdminPhotographerProfile = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user.name === "admin") {
    const user = { name: "photographer", role: "photographer" };
    return (
      <>
        <CardContainerTitle>PHOTOGRAPHER PROFILE</CardContainerTitle>

        <UserProfilePicture user={user} />
        <UpdatePersonalDetails />
        <UserProfileDetails user={user} />
        <UserProfilePassword user={user} />
      </>
    );
  }
};

export default AdminPhotographerProfile;
