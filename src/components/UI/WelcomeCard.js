import React from "react";
import { Link } from "react-router-dom";
import "./WelcomeCard.css";

// This component renders a card view to display welcome page options

const WelcomeCard = (props) => {
  return (
    <div className={"welcome-card__container " + props.className}>
      <div className="welcome-card__img-container">{props.children}</div>
      <Link className="welcome-card__btn" to={props.url}>
        {props.name}
      </Link>
    </div>
  );
};

export default WelcomeCard;
