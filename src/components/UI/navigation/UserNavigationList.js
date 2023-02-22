import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./UserNavigationList.css";

const UserNavigationList = forwardRef((props, ref) => {
  return (
    <>
      <nav
        className={"user-navigation-list__container " + props.className}
        ref={ref}
      >
        {props.children}
        <Link className="log-out__button">Log Out</Link>
      </nav>
    </>
  );
});

export default UserNavigationList;
