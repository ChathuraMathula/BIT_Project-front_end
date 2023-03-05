import React from "react";
import { CSSTransition } from "react-transition-group";
import "./ModalBody.css";
import ModalCloseButton from "./ModalCloseButton";

/**
 *
 * @param show boolean
 * @param wariningStyles warining msg styles (warning-msg-styles__red | warning-msg-styles__green)
 * @param warningMessage warining msg string
 * @param onClose close button event handler function
 * @param children modal body content
 * @param heading string heading to display
 * @param leftButton name of the left button if any
 * @param rightButton name of the right button if any
 * @param onClickLeft left button click event handler function if left button available
 * @param onClickRight right button click event handler function if right button available
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
          <div className="modal-body__action">
            <div className={"warning-msg__container " + props.warningStyles}>
              {props.warningMessage}
            </div>
            <div className="modal-action-button__container">
              {props.leftButton ? (
                <div
                  className="modal-action__button"
                  onClick={props.onClickLeft}
                >
                  {props.leftButton}
                </div>
              ) : null}
              {props.rightButton ? (
                <div
                  className="modal-action__button"
                  onClick={props.onClickRight}
                >
                  {props.rightButton}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalBody;
