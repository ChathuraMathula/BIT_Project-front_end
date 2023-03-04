import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import "./Modal.css";
import ModalBody from "./ModalBody";

const backdropRoot = document.getElementById("backdrop-root");
const modalRoot = document.getElementById("modal-root");

/**
 *
 * @param show boolean value to show or hide modal
 * @param onClose close event handler function
 * @param children modal body content
 * @param heading string heading to display
 * @param onBackdropClick backdrop click event handler function
 * @returns
 */
const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop show={props.show} onClick={props.onBackdropClick}/>, backdropRoot)}
      {createPortal(
        <ModalBody
          show={props.show}
          onClose={props.onClose}
          heading={props.heading}
        >
          {props.children}
        </ModalBody>,
        modalRoot
      )}
    </>
  );
};

export default Modal;
