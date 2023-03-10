import React, { useContext } from "react";
import { UserLoginContext } from "../../../context/Context";
import AdminDateController from "../../user/admin/dates/AdminDateController";
import CustomerDateController from "../../user/customer/CustomerDateController";
import UserDateController from "../../user/UserDateController";
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
      {login.user?.role === "admin" || login.user?.role === "photographer" ? (
        <AdminDateController date={props.date} />
      ) : null}
      {login.user?.role === "customer" ? (
        <CustomerDateController date={props.date} />
      ) : null}
      {!login.user ? <UserDateController date={props.date} /> : null}
    </>
  );
};

export default CalenderDate;
