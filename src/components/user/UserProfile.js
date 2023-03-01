import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginContext } from "../../context/Context";
import FormActionButton from "../UI/form/FormActionButton";
import FormChangePassword from "../UI/form/FormChangePassword";
import FormContainer from "../UI/form/FormContainer";
import FormInput from "../UI/form/FormInput";
import FormUploadProfilePhoto from "../UI/form/FormUploadProfilePhoto";
import "./UserProfile.css";

const UserProfile = (props) => {
  const login = useContext(UserLoginContext);
  const [user, setUser] = useState({});
  const [warningMsg, setWarningMsg] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  let userData = {};
  let profilePicture;

  useEffect(() => {
    fetch("http://localhost:3001/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userDocument) => {
        if (Object.keys(user).length === 0) {
          setUser({ ...userDocument });
        }
      });
  }, [user, warningMsg, warningStyles]);

  const inputValuesHandler = (inputValues) => {
    userData = { ...userData, ...inputValues };
    console.log("User Profile Inputs : ", userData);
  };

  const userProfilePictureHandler = (profilePic) => {
    profilePicture = profilePic;
  };

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
      <h2 className="user-profile__heading">
        {login.user.role.toUpperCase()} PROFILE
      </h2>
      <FormContainer className="user-profile-form__container">
        <div className="user-profile-intro__container">
          <FormUploadProfilePhoto
            value={userProfilePictureHandler}
            src="http://localhost:3001/users/user/profile/picture/"
          />
          <div className="user-profile-bio__container">
            <div>
              Username: <span>{user.username}</span>
            </div>
            <div>
              Fist Name: <span>{user.firstname}</span>
            </div>
            <div>
              Last Name: <span>{user.lastname}</span>
            </div>
          </div>
        </div>
        <FormInput
          className="user-profile-form__input"
          type="text"
          id="email"
          name="email"
          validateType="email"
          placeholder="example@gmail.com"
          initialValue={user.email}
          value={inputValuesHandler}
        >
          Email:
        </FormInput>
        <FormInput
          className="user-profile-form__input"
          type="text"
          id="phoneNo"
          name="phoneNo"
          validateType="phoneNo"
          placeholder="070-XXXXXXX"
          initialValue={user.phoneNo}
          value={inputValuesHandler}
        >
          Phone No:
        </FormInput>
        <FormInput
          className="user-profile-form__input"
          type="text"
          id="address"
          name="address"
          validateType="address"
          placeholder="No 35, Kurunegala Rd, Polgahawela"
          initialValue={user.address}
          value={inputValuesHandler}
        >
          Address:
        </FormInput>
        <FormChangePassword values={inputValuesHandler}/>
        <div id="user-profile__warning" className={warningStyles}>
          {warningMsg}
        </div>
        <div className="user-profile-form__action">
          <FormActionButton to="/dashboard">Cancel</FormActionButton>
          <FormActionButton onClick={onClickSaveChangesHandler}>
            Save Changes
          </FormActionButton>
        </div>
      </FormContainer>
    </>
  );
};

export default UserProfile;
