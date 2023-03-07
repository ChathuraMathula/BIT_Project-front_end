import React, { useState } from "react";
import DatePicker from "../../../UI/calender/DatePicker";
import Modal from "../../../UI/modal/Modal";
import DateAvailabilityController from "./DateAvailabilityController";

const AdminDates = (props) => {
  const [date, setDate] = useState({date: new Date()});
  const [showModal, setShowModal] = useState(false);

  const onClickPickDateHandler = (date) => {
    setDate({ ...date });
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  console.log(date);
  return (
    <>
      <DatePicker onClickDate={onClickPickDateHandler} />
      <Modal
        show={showModal}
        onBackdropClick={closeModalHandler}
        onClose={closeModalHandler}
        heading={`${date.date.toDateString()}`}
      >
        <DateAvailabilityController date={date}/>
      </Modal>
    </>
  );
};

export default AdminDates;
