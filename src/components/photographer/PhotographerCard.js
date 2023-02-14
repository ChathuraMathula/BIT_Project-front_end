import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PhotographerCard.css";

// This componenet renders photographer description and profile picture at the welcome page

const PhotographerCard = (props) => {
  const [summary, setSummary] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, set_phone_no] = useState("");
  const [fb_link, set_fb_link] = useState("");
  const [insta_link, set_insta_link] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/users/photographer/details")
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        set_phone_no(data.phone_no);
        set_fb_link(data.fb_link);
        set_insta_link(data.insta_link);
      });
  }, [summary, firstname, lastname, email, phone_no, fb_link, insta_link]);

  return (
    <div className="photographer-card__container">
      <div className="photographer-card__img-container">
        <img className="photographer-card__img"></img>
      </div>
      <div className="photographer-card__info-container">
        <h1 className="photographer-card__info-Heading">Hire Me!</h1>
        <div className="photographer-card__info-Description">{summary}</div>
        <div className="photographer-card__info-Name">
          - {firstname + " " + lastname}
        </div>
        <div className="photographer-card__info-links">
          <a
            className="photographer-card__info-link-item"
            id="photographer-phone-no"
            href={"tel:" + phone_no}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.822"
              height="25.713"
              viewBox="0 0 17.822 25.713"
            >
              <path
                id="call-svgrepo-com"
                d="M94.59,22.6l-1.914-3.973c-.412-.849-.944-1.467-1.863-1.09L89,18.215c-1.452.673-2.175,0-2.9-1.015L82.833,9.772a1.355,1.355,0,0,1,.723-2.024l2.536-1.015c.919-.382.773-1.175.362-2.024L84.279.661A1.556,1.556,0,0,0,82.1-.017,8.534,8.534,0,0,0,77.755,3.7c-1.205,2.155-.6,5.153-.362,6.414a28.093,28.093,0,0,0,2.175,5.736,26.05,26.05,0,0,0,2.9,5.063c.854,1.01,2.9,3.772,5.439,4.39a10.253,10.253,0,0,0,6.163-.678C95,24.257,95,23.459,94.59,22.6Z"
                transform="translate(-77.028 0.197)"
                fill="#032c9b"
              />
            </svg>
          </a>
          <a
            className="photographer-card__info-link-item"
            id="photographer-email"
            href={"mailto:" + email}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30.25"
              height="21.564"
              viewBox="0 0 30.25 21.564"
            >
              <g id="gmail-svgrepo-com" transform="translate(-15.976 -25.524)">
                <path
                  id="Path_34"
                  data-name="Path 34"
                  d="M82.89,202.4V191.04L76,186v14q0,2.4,2.521,2.4"
                  transform="translate(-60.024 -155.31)"
                  fill="#4980ef"
                />
                <path
                  id="Path_35"
                  data-name="Path 35"
                  d="M154,157.839,162.571,164l8.571-6.159V150l-8.571,6.159L154,150"
                  transform="translate(-131.47 -122.19)"
                  fill="#ff0023"
                />
                <path
                  id="Path_36"
                  data-name="Path 36"
                  d="M354,202.4V191.04l6.89-5.04v14q0,2.4-2.521,2.4"
                  transform="translate(-314.664 -155.31)"
                  fill="#15b30b"
                />
                <path
                  id="Path_37"
                  data-name="Path 37"
                  d="M76,126.748l6.89,5.04v-7.839l-2.521-1.84A2.6,2.6,0,0,0,76,124.189"
                  transform="translate(-60.024 -95.899)"
                  fill="#a20101"
                />
                <path
                  id="Path_38"
                  data-name="Path 38"
                  d="M360.89,126.748l-6.89,5.04v-7.839l2.521-1.84a2.6,2.6,0,0,1,4.37,2.08"
                  transform="translate(-314.664 -95.899)"
                  fill="#fa0"
                />
              </g>
            </svg>
          </a>
          <a
            className="photographer-card__info-link-item"
            id="photographer-fb_link"
            href={fb_link}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25.724"
              height="25.556"
              viewBox="0 0 25.724 25.556"
            >
              <path
                id="Path_32"
                data-name="Path 32"
                d="M26.717,13.856a12.862,12.862,0,1,0-14.865,12.7V17.571H8.591V13.856h3.264V11.024c0-3.221,1.919-5,4.856-5a19.728,19.728,0,0,1,2.878.252V9.437H17.966a1.857,1.857,0,0,0-2.094,2.007v2.411h3.565l-.569,3.715h-3v8.984a12.858,12.858,0,0,0,10.847-12.7Z"
                transform="translate(-0.993 -1)"
                fill="#06f"
              />
            </svg>
          </a>
          <a
            className="photographer-card__info-link-item"
            id="photographer-insta_link"
            href={insta_link}
          >
            <svg
              id="instagram-svgrepo-com"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25.713"
              viewBox="0 0 25 25.713"
            >
              <path
                id="Path_39"
                data-name="Path 39"
                d="M17.969,0H7.031A7.1,7.1,0,0,0,0,7.232V18.481a7.1,7.1,0,0,0,7.031,7.232H17.969A7.1,7.1,0,0,0,25,18.481V7.232A7.1,7.1,0,0,0,17.969,0Z"
                fill="rgba(108,10,255,0.98)"
              />
              <circle
                id="Ellipse_5"
                data-name="Ellipse 5"
                cx="6.602"
                cy="6.602"
                r="6.602"
                transform="translate(6.226 6.144)"
                fill="none"
                stroke="#fff"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <circle
                id="Ellipse_6"
                data-name="Ellipse 6"
                cx="1.65"
                cy="1.65"
                r="1.65"
                transform="translate(17.577 2.843)"
                fill="rgba(255,255,255,0.98)"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
export default PhotographerCard;
