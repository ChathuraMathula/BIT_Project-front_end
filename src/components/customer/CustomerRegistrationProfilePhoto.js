import React from "react";
import FormUploadProfilePhoto from "../UI/form/FormUploadProfilePhoto";
import "./CustomerRegistrationProfilePhoto.css";


const CustomerRegistrationProfilePhoto = (props) => {

  const profilePhotoValueHandler = (inputValue) => {
    props.value(inputValue);
  }

  return (
    <>
      <FormUploadProfilePhoto value={profilePhotoValueHandler}/>
    </>
  );
};

export default CustomerRegistrationProfilePhoto;
