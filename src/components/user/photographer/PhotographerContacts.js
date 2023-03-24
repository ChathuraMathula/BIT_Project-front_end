import React from "react";
import EmailSVG from "../../UI/SVG/EmailSVG";
import FacebookSVG from "../../UI/SVG/FacebookSVG";
import InstagramSVG from "../../UI/SVG/InstagramSVG";
import PhoneSVG from "../../UI/SVG/PhoneSVG";
import "./PhotographerContacts.css";

/**
 *
 * @param email
 * @param phoneNo
 * @param facebook
 * @param instagram
 * @returns
 */
const PhotographerContacts = (props) => {
  return <div className="photographer-contacts__container">
    {props.phoneNo ? <a><PhoneSVG /></a> : null}
    {props.email ? <a><EmailSVG /></a> : null}
    {props.facebook ? <a><FacebookSVG /></a> : null}
    {props.instagram ? <a><InstagramSVG /></a> : null}
  </div>;
};

export default PhotographerContacts;
