import React from "react";
import { CSSTransition } from "react-transition-group";
import "./ModalBody.css";
import ModalCloseButton from "./ModalCloseButton";

/**
 *
 * @param show boolean
 * @param onClose close button event handler function
 * @param children modal body content
 * @param heading string heading to display
 * @returns
 */
const ModalBody = (props) => {
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
        <div className="modal-body">
          <div className="modal-body__heading">{props.heading}</div>
          <ModalCloseButton onClick={props.onClose} />
          <div className="modal-body__container">{props.children}</div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalBody;
