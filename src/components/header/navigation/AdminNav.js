import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserNavigation from "../../UI/navigation/UserNavigation";
import "./AdminNav.css";

const AdminNav = (props) => {
  const [state, setState] = useState({});
  const [location, setLocation] = useState(window.location.pathname);

  const onClickDashboard = () => {
    setState({dashboard: "user-navigation-link__active"})
  };

  const onClickProfile = () => {
    setState({profile: "user-navigation-link__active"})
  };

  const onClickPhotographer = () => {
    setState({photographer: "user-navigation-link__active"})
  };

  const onClickPackages = () => {
    setState({packages: "user-navigation-link__active"})
  };

  const onClickPortfolio = () => {
    setState({portfolio: "user-navigation-link__active"})
  };


  useEffect(() => {
    if (location === "/dashboard") {
      setState({dashboard: "user-navigation-link__active"});
    }
  }, [location]);

  return (
    <>
      <UserNavigation>
        <Link className={state.dashboard} onClick={onClickDashboard} to="/dashboard">
          Dashboard
        </Link>
        <Link className={state.profile} onClick={onClickProfile} to="/profile">
          Profile
        </Link>
        <Link className={state.photographer} onClick={onClickPhotographer}>
          Photographer
        </Link>
        <Link className={state.packages} onClick={onClickPackages}>
          Packages
        </Link>
        <Link className={state.portfolio} onClick={onClickPortfolio}>
          Portfolio
        </Link>
      </UserNavigation>
    </>
  );
};

export default AdminNav;
