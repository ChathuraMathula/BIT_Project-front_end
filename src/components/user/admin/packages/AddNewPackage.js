import React, { useState } from "react";
import Modal from "../../../UI/modal/Modal";

const AddNewPackage = (props) => {
  const [showModal, setShowModal] = useState(false);

  const onClickAddPackageHandler = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const onCloseAddPackageHandler = (event) => {
    setShowModal(false);
  };

  const onBackdropClickHandler = (event) => {
    setShowModal(false);
  };
  return (
    <>
      <button onClick={onClickAddPackageHandler}>Add New Package</button>
      <Modal
        show={showModal}
        onClose={onCloseAddPackageHandler}
        heading="ADD NEW PACKAGE"
        onBackdropClick={onBackdropClickHandler}
      />
    </>
  );
};

export default AddNewPackage;
