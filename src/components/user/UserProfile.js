import React, { useContext, useState } from "react";
import { UserLoginContext } from "../../context/Context";
import FormHeading from "../UI/form/FormHeading";
import "./UserProfile.css";
import UserProfileDetails from "./UserProfileDetails";
import UserProfilePassword from "./UserProfilePassword";
import UserProfilePicture from "./UserProfilePicture";

const UserProfile = (props) => {
  const login = useContext(UserLoginContext);
  const [user, setUser] = useState({});
  const [warningMsg, setWarningMsg] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  let userData = {};
  let profilePicture;


  const setSuccessMsg = (message) => {
    let warningMsg = "";
    if (typeof message === "string") {
      warningMsg += message;
    } else {
      if (message.passwordUpdate) {
        warningMsg += message.passwordUpdate + " ";
      }
      if (message.userUpdate) {
        warningMsg += message.userUpdate + " ";
      }
      if (message.profilePictureUpdate) {
        warningMsg += message.profilePictureUpdate + " ";
      }
    }
    setWarningMsg(warningMsg);
    setWarningStyles("user-profile-warning__green");
    setInterval(() => {
      setWarningMsg("");
    }, 5000);
  };

  const setErrorMsg = (message) => {
    setWarningMsg(message);
    setWarningStyles("user-profile-warning__red");
    setInterval(() => {
      setWarningMsg("");
    }, 5000);
  };

  const onClickSaveChangesHandler = async (event) => {
    const formData = new FormData();
    console.log(Object.keys(userData).length);

    console.log(profilePicture);
    if (Object.keys(userData).length > 0 || profilePicture) {
      if (userData.oldPassword && userData.newPassword) {
        formData.append("oldPassword", userData.oldPassword);
        formData.append("newPassword", userData.newPassword);
      }

      if (userData.email) {
        formData.append("email", userData.email);
      }
      if (userData.phoneNo) {
        formData.append("phoneNo", userData.phoneNo);
      }
      if (userData.address) {
        formData.append("address", userData.address);
      }

      formData.append("username", user.username);
      formData.append("role", login.user.role);

      if (profilePicture) {
        formData.append("image", profilePicture);
      }

      await fetch("http://localhost:3001/user/update", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            let message = data.message;
            if (message) {
              setSuccessMsg(message);
            }
          } else {
            setErrorMsg("There is an error occurred. 😧");
          }
        })
        .catch((error) => {
          if (error) {
            setErrorMsg("Failed to fetch. 😵");
          }
        });
    } else {
      setSuccessMsg("Nothing to change. 🙂");
    }
  };

  return (
    <>
      <FormHeading>{login.user.role.toUpperCase()} PROFILE</FormHeading>

      <UserProfilePicture user={login.user}/>
      <UserProfileDetails user={login.user}/>
      <UserProfilePassword />
    </>
  );
};

export default UserProfile;
