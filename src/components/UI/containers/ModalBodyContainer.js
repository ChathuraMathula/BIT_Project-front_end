import React from "react";
import "./ModalBodyContainer.css";

/**
 *
 * @param children
 * @param className
 * @returns
 */
const ModalBodyContainer = (props) => {
  return (
    <div className={"modal-body-main__container " + props.className}>
      {props.children}
    </div>
  );
};

export default ModalBodyContainer;
