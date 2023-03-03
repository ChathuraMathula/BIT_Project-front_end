import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import FormHeading from "../../UI/form/FormHeading";
import UserProfileDetails from "../UserProfileDetails";
import UserProfilePassword from "../UserProfilePassword";
import UserProfilePicture from "../UserProfilePicture";

const AdminPhotographerProfile = (props) => {
  const login = useContext(UserLoginContext);

  if (login.user.name === "admin") {
    const user = {name: "photographer", role: "photographer"};
    return (
      <>
        <FormHeading>PHOTOGRAPHER PROFILE</FormHeading>
        <UserProfilePicture user={user} />
        <UserProfileDetails user={user} />
        <UserProfilePassword user={user} />
      </>
    );
  }
};

export default AdminPhotographerProfile;
