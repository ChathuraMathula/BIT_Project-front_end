import React from "react";
import { CSSTransition } from "react-transition-group";
import "./InfoBackdrop.css";

/**
 *
 * @param show boolean
 * @returns
 */
const InfoBackdrop = (props) => {
  const animationTimeout = {
    enter: 400,
    exit: 1000,
  };

  return (
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={animationTimeout}
        classNames={{
          enterActive: "BackdropOpen",
          exitActive: "BackdropClose",
        }}
      >
        <div className="info-backdrop" onClick={props.onClick}></div>
      </CSSTransition>
    </>
  );
};

export default InfoBackdrop;
