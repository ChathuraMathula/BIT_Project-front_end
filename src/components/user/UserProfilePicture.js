import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../context/Context";
import GreenButton from "../UI/buttons/GreenButton";
import RedButton from "../UI/buttons/RedButton";
import ButtonContainer from "../UI/containers/ButtonContainer";
import CardContainer from "../UI/containers/CardContainer";
import FormUploadProfilePhoto from "../UI/form/FormUploadProfilePhoto";
import CardContainerTitle from "../UI/titles/CardContainerTitle";
import "./UserProfilePicture.css";

const UserProfilePicture = (props) => {
  const login = useContext(UserLoginContext);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (props.user) {
      const formData = new FormData();
      formData.append("username", props.user.name);

      fetch("http://localhost:3001/user", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
        .then((userDocument) => {
          if (userDocument) {
            setUsername(userDocument.username);
            setFirstname(userDocument.firstname);
            setLastname(userDocument.lastname);
          }
        });
    }
  }, []);

  const displayError = (message) => {
    setWarningStyles("warning-msg-styles__red");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const displaySuccess = (message) => {
    setWarningStyles("warning-msg-styles__green");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const onChangeImageHandler = (file) => {
    if (file) {
      setImage(file);
    }
  };

  const onClickAddPictureHandler = async (e) => {
    e.preventDefault();

    try {
      if (image) {
        if (image.size < 200000000) {
          const formData = new FormData();

          formData.append("username", props.user.name);
          formData.append("image", image);

          await fetch("http://localhost:3001/user/update/profile/picture", {
            method: "POST",
            credentials: "include",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                if (data.success) {
                  displaySuccess(data.success);
                } else if (data.error) {
                  displayError(data.error);
                }
              }
            });
        } else {
          displayError("Image size should be less than 2MB. 😒");
        }
      } else {
        displayError("You haven't change your profile picture. 😏");
      }
    } catch (error) {
      displayError("An error occurred. 😑");
    }
  };

  const onClickRemovePictureHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", props.user.name);
      formData.append("removeImage", true);
      console.log(">>>>>>>>>>> ", props.user.name);

      await fetch("http://localhost:3001/user/remove/profile/picture", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            if (data.success) {
              displaySuccess(data.success);
            } else if (data.error) {
              displayError(data.error);
            }
          } else {
            throw "error";
          }
        });
    } catch (error) {
      displayError("An error occurred. 😑");
    }
  };

  return (
    <>
      <CardContainer>
        <CardContainerTitle>PROFILE PICTURE</CardContainerTitle>
        <div className="user-profile-picture__input-container">
          <FormUploadProfilePhoto
            user={props.user}
            onChange={onChangeImageHandler}
          />
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

        <ButtonContainer>
          <RedButton onClick={onClickRemovePictureHandler}>Remove</RedButton>
          <GreenButton onClick={onClickAddPictureHandler}>Add</GreenButton>
        </ButtonContainer>
      </CardContainer>
    </>
  );
};

export default UserProfilePicture;
