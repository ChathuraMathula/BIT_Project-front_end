import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import CardContainer from "../../UI/containers/CardContainer";
import FormHeading from "../../UI/form/FormHeading";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import UpdatePersonalDetails from "../photographer/UpdatePersonalDetails";
import UserProfileDetails from "../UserProfileDetails";
import UserProfilePassword from "../UserProfilePassword";
import UserProfilePicture from "../UserProfilePicture";

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
