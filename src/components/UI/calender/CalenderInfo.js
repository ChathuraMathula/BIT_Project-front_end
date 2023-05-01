import React, { useContext } from "react";
import "./CalenderInfo.css";
import { UserLoginContext } from "../../../context/Context";

const CalenderInfo = (props) => {
  const login = useContext(UserLoginContext);

  return (
    <>
      <h3 className="calender-info__heading">Calendar Date Indicators</h3>
      <div className="calender-info__container">
        {login.user.role === "admin" || login.user.role === "photographer" ? (
          <>
            <div className="calender-info-date__icon">
              <div className="calender-date available">01</div>
            </div>
            <div className="calender-info-date__description">
              Clickable available date. You can set the date to unavailable by
              clicking on it.
            </div>
          </>
        ) : null}
        <div className="calender-info-date__icon">
          <div className="calender-date">01</div>
        </div>
        <div className="calender-info-date__description">
          {login.user.role === "admin" || login.user.role === "photographer"
            ? "Clickable unavailable date. You can set the date to available by clicking on it."
            : "Clickable available date. You can send a reservation request by clicking on it and get reserved this type of dates."}
        </div>
        <div className="calender-info-date__icon">
          <div className="calender-date today">01</div>
        </div>
        <div className="calender-info-date__description">
          Inaccessible date. Today is indicated like this. You cannot access
          this date.
        </div>
        <div className="calender-info-date__icon">
          <div className="calender-date disabled">01</div>
        </div>
        <div className="calender-info-date__description">
          Inaccessible date. Usually the dates that are unavailable and previous
          or next month's dates are indicated like this. These dates cannot be
          clicked.
        </div>
        <div className="calender-info-date__icon">
          <div className="calender-date pending">01</div>
        </div>
        <div className="calender-info-date__description">
          Clickable pending date. All the dates that have already been requested
          to get reserved but not confirmed are indicated like this. You can
          check the state of the pending reservation by clicking on it.
        </div>
        <div className="calender-info-date__icon">
          <div className="calender-date confirmed">01</div>
        </div>
        <div className="calender-info-date__description">
          Clickable confirmed date. All the dates that have successfully been
          reserved are indicated like this. You can click each on it to see the
          reservation info.
        </div>
      </div>
    </>
  );
};

export default CalenderInfo;
