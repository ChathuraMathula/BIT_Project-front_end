import React from "react";
import EmailSVG from "../../UI/SVG/EmailSVG";
import FacebookSVG from "../../UI/SVG/FacebookSVG";
import InstagramSVG from "../../UI/SVG/InstagramSVG";
import PhoneSVG from "../../UI/SVG/PhoneSVG";
import "./PhotographerContacts.css";

/**
 *
 * @param props.email
 * @param props.phoneNo
 * @returns
 */
const PhotographerContacts = (props) => {
  return <div className="photographer-contacts__container">
    {props.phoneNo ? <a href={`tel:${props.phoneNo}`}><PhoneSVG /></a> : null}
    {props.email ? <a target="_blank" href={`mailto:${props.email}`}><EmailSVG /></a> : null}
  </div>;
};

export default PhotographerContacts;
