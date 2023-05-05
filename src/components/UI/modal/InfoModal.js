import React from "react";
import { createPortal } from "react-dom";
import InfoModalBody from "./InfoModalBody";
import InfoBackdrop from "./InfoBackdrop";

const backdropRoot = document.getElementById("info-backdrop-root");
const modalRoot = document.getElementById("info-modal-root");

/**
 *
 * @param show boolean value to show or hide modal
 * @param onClose close event handler function
 * @param children modal body content
 * @param heading
 * @param className
 * @returns
 */
const Modal = (props) => {
  return (
    <>
      {createPortal(
        <InfoBackdrop
          show={props.show}
          onClick={
            props.onBackdropClose ? props.onBackdropClose : props.onClose
          }
        />,
        backdropRoot
      )}
      {createPortal(
        <InfoModalBody
          heading={props.heading}
          show={props.show}
          onClose={props.onClose}
        >
          {props.children}
        </InfoModalBody>,
        modalRoot
      )}
    </>
  );
};

export default Modal;
