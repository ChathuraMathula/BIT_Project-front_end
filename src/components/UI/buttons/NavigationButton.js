import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationButton.css";

/**
 *
 * @param children
 * @param to
 * @returns
 */
const NavigationButton = (props) => {
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setActive(window.location.pathname === props.to);
  }, [window.location.pathname]);

  const onClickNavigateToHandler = (e) => {
    navigate(props.to, { replace: true });
  };

  return (
    <>
      <button
        onClick={onClickNavigateToHandler}
        className={
          active
            ? "navigation-button navigation-button__active"
            : "navigation-button"
        }
        to={props.to}
      >
        {props.children}
      </button>
    </>
  );
};

export default NavigationButton;
