import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavDropdownBtn from "../../UI/NavDropdownBtn";
import "./GeneralNav.css";

// This component renders the header navigation links that are general to all users

const GeneralNav = (props) => {
  const [isNavNotExpanded, setIsNavNotExpanded] = useState(true);

  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/users/photographer/details")
      .then((res) => res.json())
      .then((data) => {
        setPhoneNo(data.phone_no);
      });
  }, [phoneNo]);

  return (
    <nav className="general-nav__container">
      <div
        className={
          isNavNotExpanded
            ? "general-nav__list nav-not-expanded"
            : "general-nav__list"
        }
      >
        <Link className="general-nav__link" to={"tel:" + phoneNo}>
          Call Me
        </Link>
        <Link className="general-nav__link" to="/sign-up">
          Sign Up
        </Link>
        <Link className="general-nav__link" to="/login">
          Login
        </Link>
      </div>
      <NavDropdownBtn className="general-nav__dropdown-btn"
        onClick={() => {
          setIsNavNotExpanded(!isNavNotExpanded);
        }}
      />
    </nav>
  );
};

export default GeneralNav;
