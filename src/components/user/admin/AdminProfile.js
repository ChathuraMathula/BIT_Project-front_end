import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import FormHeading from "../../UI/form/FormHeading";
import UserProfilePassword from "../UserProfilePassword";
import UserProfilePicture from "../UserProfilePicture";

const AdminProfile = (props) => {
    const login = useContext(UserLoginContext);
  return (
    <>
      <FormHeading>{login.user.role.toUpperCase()} PROFILE</FormHeading>
      <UserProfilePicture user={login.user}/>
      <UserProfilePassword user={login.user}/>

    </>
  );
};

export default AdminProfile;
