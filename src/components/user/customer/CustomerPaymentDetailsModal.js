import React from "react";
import Modal from "../../UI/modal/Modal";
import "./CustomerPaymentDetailsModal.css";

const CustomerPaymentDetailsModal = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onClose={props.onClose}
        onBackdropClick={props.onClose}
        heading={props.date.toDateString()}
      ></Modal>
    </>
  );
};

export default CustomerPaymentDetailsModal;
