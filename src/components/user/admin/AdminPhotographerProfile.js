import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import FormHeading from "../../UI/form/FormHeading";
import UserProfilePassword from "../UserProfilePassword";
import UserProfilePicture from "../UserProfilePicture";

const AdminPhotographerProfile = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user.name === "admin") {
    return (
      <>
        <FormHeading>PHOTOGRAPHER PROFILE</FormHeading>
        <UserProfilePicture user={login.user} />
        <UserProfilePassword user={login.user} />
      </>
    );
  }
};

export default AdminPhotographerProfile;
