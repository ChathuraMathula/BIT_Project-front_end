import React from "react";
import { CSSTransition } from "react-transition-group";
import "./Backdrop.css";

/**
 *
 * @param show boolean
 * @returns
 */
const Backdrop = (props) => {
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
        <div className="backdrop" onClick={props.onClick}></div>
      </CSSTransition>
    </>
  );
};

export default Backdrop;
