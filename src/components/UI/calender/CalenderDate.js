import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import AdminDateController from "../../user/admin/dates/AdminDateController";
import "./CalenderDate.css";

/**
 *
 * @param {object} date date object eg: {date: Date(), disabled: boolean}
 * @returns
 */
const CalenderDate = (props) => {
  const login = useContext(UserLoginContext);
  return (
    <>
      {login.user.name === "admin" ? <AdminDateController date={props.date}/> : null}
    </>
  );
};

export default CalenderDate;
