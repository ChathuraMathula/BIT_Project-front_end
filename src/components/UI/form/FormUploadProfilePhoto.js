import React, { useState } from "react";
import { isValidImageFile } from "../../../utils/Validator";
import "./FormUploadProfilePhoto.css";

/* 
  Component Name: <FormUploadProfilePhoto />
  Date Modified: 19.02.2023
  Author: Chathura Ekanayake
  Props:
    value = function() --- returns the {image: file} or {imageWarning: "message string"}
*/

/**
 *
 * @param value function to lift up the value of the file
 * @returns object containing the image file or null { image : null } | { image: file }
 */
const FormUploadProfilePhoto = (props) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onchangeHandler = (event) => {
    const file = event.target.files[0]; // take the uploaded file
    if (file) {
      // if image is of type png/jpeg
      if (isValidImageFile(file)) {
        setFileUrl(URL.createObjectURL(event.target.files[0]));
        props.value(file);
      }
    } else {
      props.value(null);
      setFileUrl("");
    }
  };

  return (
    <div className="form-upload-profile-photo__container">
      <img className="form-upload-profile-photo__pic" src={fileUrl}></img>
      <label
        className="form-upload-profile-photo__button"
        for="uploadProfilePhoto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="463"
          height="463"
          viewBox="0 0 463 463"
        >
          <rect
            id="Rectangle_24"
            data-name="Rectangle 24"
            width="463"
            height="463"
            fill="#adc2eb"
          />
          <line
            id="Line_1"
            data-name="Line 1"
            y2="338"
            transform="translate(231.5 62.5)"
            fill="none"
            stroke="#000a1a"
            stroke-width="55"
          />
          <line
            id="Line_2"
            data-name="Line 2"
            y2="338"
            transform="translate(400.5 231.5) rotate(90)"
            fill="none"
            stroke="#000a1a"
            stroke-width="55"
          />
        </svg>

        <input
          type="file"
          name="image"
          id="uploadProfilePhoto"
          onChange={onchangeHandler}
        ></input>
      </label>
    </div>
  );
};

export default FormUploadProfilePhoto;
