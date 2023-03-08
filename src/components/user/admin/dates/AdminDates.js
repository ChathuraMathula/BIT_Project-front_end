import React, { useState } from "react";
import DatePicker from "../../../UI/calender/DatePicker";
import Modal from "../../../UI/modal/Modal";
import DateAvailabilityController from "./DateAvailabilityController";

const AdminDates = (props) => {
  const [date, setDate] = useState({ date: new Date() });
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const onClickPickDateHandler = (date) => {
    setDate({ ...date });
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const onCheckedHandler = (event) => {
    setChecked(event.target.checked);
  };

  const saveAvailabilityHandler = async () => {
    if (checked) {
      await fetch("http://localhost:3001/admin/add/available/date", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          date: {
            year: date.date.getFullYear(),
            month: date.date.getMonth(),
            day: date.date.getDate(),
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <>
      <DatePicker onClickDate={onClickPickDateHandler} />
      {/* <Modal
        show={showModal}
        onBackdropClick={closeModalHandler}
        onClose={closeModalHandler}
        heading={`${date.date.toDateString()}`}
        leftButton={"SAVE CHANGES"}
        onClickLeft={saveAvailabilityHandler}
      >
        <DateAvailabilityController date={date} onChecked={onCheckedHandler} />
      </Modal> */}
    </>
  );
};

export default AdminDates;
