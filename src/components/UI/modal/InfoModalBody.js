import React from "react";
import "./InfoModalBody.css";
import { CSSTransition } from "react-transition-group";
import ModalBodyContainer from "../containers/ModalBodyContainer";
import ScrollableContainer from "../containers/ScrollableContainer";
import ModalCloseButton from "./ModalCloseButton";

/**
 *
 * @param onClose
 * @param children
 * @param show
 * @param heading
 * @returns
 */
const InfoModalBody = (props) => {
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
          enterActive: "InfoModalOpen",
          exitActive: "InfoModalClose",
        }}
      >
        <ModalBodyContainer className="info-modal-body__container">
          <ModalCloseButton onClick={props.onClose} />
          <ScrollableContainer>
            <h3 className="info-modal__heading">{props.heading}</h3>
            <div className="info-modal__behind-heading"></div>
            {props.children}
          </ScrollableContainer>
        </ModalBodyContainer>
      </CSSTransition>
    </>
  );
};

export default InfoModalBody;
