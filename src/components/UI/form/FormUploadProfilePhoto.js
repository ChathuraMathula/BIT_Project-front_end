import React, { useState } from "react";
import "./FormUploadProfilePhoto.css";

const FormUploadProfilePhoto = (props) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onchangeHandler = (event) => {
    setFileUrl(URL.createObjectURL(event.target.files[0]));
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
          id="uploadProfilePhoto"
          onChange={onchangeHandler}
        ></input>
      </label>
    </div>
  );
};

export default FormUploadProfilePhoto;
