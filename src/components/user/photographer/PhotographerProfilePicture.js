import React from "react";
import "./PhotographerProfilePicture.css";

const PhotographerProfilePicture = (props) => {
  return (
    <div className="photographer-profile__picture">
      <img src={props.src}></img>
    </div>
  );
};

export default PhotographerProfilePicture;
