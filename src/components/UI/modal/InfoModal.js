import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import InfoModalBody from "./InfoModalBody";

const backdropRoot = document.getElementById("backdrop-root");
const modalRoot = document.getElementById("modal-root");

/**
 *
 * @param show boolean value to show or hide modal
 * @param onClose close event handler function
 * @param children modal body content
 * @param className
 * @returns
 */
const Modal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop show={props.show} onClick={props.onClose} />,
        backdropRoot
      )}
      {createPortal(
        <InfoModalBody show={props.show} onClose={props.onClose}>
          {props.children}
        </InfoModalBody>,
        modalRoot
      )}
    </>
  );
};

export default Modal;
