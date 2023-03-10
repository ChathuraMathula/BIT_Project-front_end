import React, { useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import "./Modal.css";
import ModalBody from "./ModalBody";

const backdropRoot = document.getElementById("backdrop-root");
const modalRoot = document.getElementById("modal-root");

/**
 *
 * @param show boolean value to show or hide modal
 * @param wariningStyles warining msg styles (warning-msg-styles__red | warning-msg-styles__green)
 * @param warningMessage warining msg string
 * @param onClose close event handler function
 * @param children modal body content
 * @param heading string heading to display
 * @param onBackdropClick backdrop click event handler function
 * @param leftButton name of the left button if any
 * @param rightButton name of the right button if any
 * @param onClickLeft left button click event handler function if left button available
 * @param onClickRight right button click event handler function if right button available
 * @param className
 * @returns
 */
const Modal = (props) => {

  return (
    <>
      {createPortal(
        <Backdrop
          show={props.show}
          onClick={props.onBackdropClick}
        />,
        backdropRoot
      )}
      {createPortal(
        <ModalBody
          show={props.show}
          onClose={props.onClose}
          heading={props.heading}
          leftButton={props.leftButton}
          rightButton={props.rightButton}
          onClickLeft={props.onClickLeft}
          onClickRight={props.onClickRight}
          warningStyles={props.warningStyles}
          warningMessage={props.warningMessage}
          className={props.className}
        >
          {props.children}
        </ModalBody>,
        modalRoot
      )}
    </>
  );
};

export default Modal;
