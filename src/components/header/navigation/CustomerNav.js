import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserNavigation from "../../UI/navigation/UserNavigation";
import "./CustomerNav.css";

const CustomerNav = (props) => {
  const [state, setState] = useState({});

  const onClickDashboard = () => {
    setState({ dashboard: "user-navigation-link__active" });
  };

  const onClickProfile = () => {
    setState({ profile: "user-navigation-link__active" });
  };

  return (
    <>
      <UserNavigation>
        <Link
          className={state.dashboard}
          onClick={onClickDashboard}
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link className={state.profile} onClick={onClickProfile}>
          Profile
        </Link>
      </UserNavigation>
    </>
  );
};

export default CustomerNav;
