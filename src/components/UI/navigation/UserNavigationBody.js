import React from "react";
import { CSSTransition } from "react-transition-group";
import "./UserNavigationBody.css";

const UserNavigationBody = (props) => {
  const animationTiming = {
    enter: 1000,
    exit: 1000,
  };
  return (
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={animationTiming}
        classNames={{
          enterActive: "ModalOpen",
          exitActive: "ModalClose",
        }}
      >
        <nav>
            
        </nav>
      </CSSTransition>
    </>
  );
};

export default UserNavigationBody;
