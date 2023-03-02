import React, { useEffect, useState } from "react";
import FormActionButton from "../UI/form/FormActionButton";
import FormContainer from "../UI/form/FormContainer";
import FormSubHeading from "../UI/form/FormSubHeading";
import FormUploadProfilePhoto from "../UI/form/FormUploadProfilePhoto";
import "./UserProfilePicture.css";

const UserProfilePicture = (props) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userDocument) => {
        if (userDocument) {
          setUsername(userDocument.username);
          setFirstname(userDocument.firstname);
          setLastname(userDocument.lastname);
        }
      });
  }, []);

  const displayWarning = (message) => {
    setWarningStyles("login-form-warning__red");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  return (
    <FormContainer>
      <FormSubHeading>PROFILE PICTURE</FormSubHeading>
      <div className="user-profile-picture__input-container">
        <FormUploadProfilePhoto src="http://localhost:3001/users/user/profile/picture/" />
        <div className="user-profile-picture__bio-container">
          <div>
            Username: <span>{username}</span>
          </div>
          <div>
            Fist Name: <span>{firstname}</span>
          </div>
          <div>
            Last Name: <span>{lastname}</span>
          </div>
        </div>
      </div>
      <div className={"warning-msg__container " + warningStyles}>
        {warningMessage}
      </div>
      <div className="user-profile-picture__action">
        <FormActionButton>REMOVE</FormActionButton>
        <FormActionButton>SAVE</FormActionButton>
      </div>
    </FormContainer>
  );
};

export default UserProfilePicture;
