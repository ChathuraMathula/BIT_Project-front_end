import React from "react";
import "./LoginCardContainer.css";

const LoginCardContainer = props => {
    return <div className="login-card__container">{props.children}</div>
}

export default LoginCardContainer;