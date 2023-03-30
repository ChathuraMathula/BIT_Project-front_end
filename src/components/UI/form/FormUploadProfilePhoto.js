import React, { useEffect, useState } from "react";
import { isValidImageFile } from "../../../utils/Validator";
import "./FormUploadProfilePhoto.css";

/**
 *
 * @param onChange function to lift up the value of the file
 * @returns object containing the image file or null { image : null } | { image: file }
 */
const FormUploadProfilePhoto = (props) => {
  const [fileUrl, setFileUrl] = useState(props.src);

  const onchangeHandler = (event) => {
    const file = event.target.files[0]; // take the uploaded file
    if (file) {
      // if image is of type png/jpeg
      if (isValidImageFile(file)) {
        setFileUrl(URL.createObjectURL(event.target.files[0]));
        props.onChange(file);
      }
    } else {
      props.onChange(null);
    }
  };

  useEffect(() => {
    if (props.user) {
      const formData = new FormData();
      formData.append("username", props.user.name);

      fetch("http://localhost:3001/user/profile/picture", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.blob())
        .then((data) => {
          if (data) {
            console.log("PICTURE", data);
            setFileUrl(URL.createObjectURL(data));
          }
        });
    }
  }, []);

  return (
    <div className="form-upload-profile-photo__container">
      <div>
        <img
          className="form-upload-profile-photo__pic"
          src={fileUrl}
          alt=""
        ></img>
        <label
          className="form-upload-profile-photo__button"
          htmlFor="uploadProfilePhoto"
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
    </div>
  );
};

export default FormUploadProfilePhoto;
