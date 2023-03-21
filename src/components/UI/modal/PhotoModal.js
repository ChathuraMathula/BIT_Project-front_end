import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import "./Modal.css";
import ModalBody from "./ModalBody";
import PhotoModalBody from "./PhotoModalBody";

const backdropRoot = document.getElementById("backdrop-root");
const modalRoot = document.getElementById("photo-modal-root");

/**
 *
 * @param show boolean value to show or hide modal
 * @param wariningStyles warining msg styles (warning-msg-styles__red | warning-msg-styles__green)
 * @param warningMessage warining msg string
 * @param onClose close event handler function
 * @param children modal body content
 * @param onBackdropClick backdrop click event handler function
 * @param src background image url
 * @param onDelete function handler for delete yes click button event
 * @returns
 */
const PhotoModal = (props) => {

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
        <PhotoModalBody
          show={props.show}
          onClose={props.onClose}
          src={props.src}
          onDelete={props.onDelete}
        >
          {props.children}
        </PhotoModalBody>,
        modalRoot
      )}
    </>
  );
};

export default PhotoModal;
