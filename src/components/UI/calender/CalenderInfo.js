import React, { useContext } from "react";
import "./CalenderInfo.css";
import { UserLoginContext } from "../../../context/Context";

const CalenderInfo = (props) => {
  const login = useContext(UserLoginContext);

  return (
    <>
      <div className="calender-info__container">
        {login.user?.role === "admin" || login.user?.role === "photographer" ? (
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
          {login.user?.role === "admin" || login.user?.role === "photographer"
            ? "Clickable unavailable date. You can set the date to available by clicking on it."
            : login.user?.role === "customer"
            ? "Clickable available date. You can send a reservation request by clicking on it and get reserved this type of dates."
            : "Clickable available date. You will be redirected to login page if you click on each of this type of date."}
        </div>
        {login.isLogged ? (
          <>
            <div className="calender-info-date__icon">
              <div className="calender-date today">01</div>
            </div>
            <div className="calender-info-date__description">
              Inaccessible date. Today is indicated like this. You cannot access
              this date.
            </div>
          </>
        ) : null}
        <div className="calender-info-date__icon">
          <div className="calender-date disabled">01</div>
        </div>
        <div className="calender-info-date__description">
          Inaccessible date. Usually the dates that are unavailable and previous
          or next month's dates are indicated like this. These dates cannot be
          clicked.
        </div>
        {login.isLogged ? (
          <>
            <div className="calender-info-date__icon">
              <div className="calender-date pending-yellow">01</div>
            </div>
            <div className="calender-info-date__description">
              {login.user?.role === "customer"
                ? `Clickable date. This indicates that you have sent a reservation request to the 
                photographer and you have to wait untill the photographer responds with cost datails.`
                : `Clickable date. This indicates that you have received a new reservation request. 
                You can click on this date and send reservation cost details to the customer.`}
            </div>

            <div className="calender-info-date__icon">
              <div className="calender-date pending-orange">01</div>
            </div>
            <div className="calender-info-date__description">
              {login.user?.role === "customer"
                ? `Clickable date. This indicates that you have received the cost details. 
                You have to click on this date and send your valid payment details within 24 
                hours after you received the cost details.`
                : `Clickable date. This indicates that you have sent your cost details to the 
                customer. You can click on this date and see the remaining time your customer
                has to respond within.`}
            </div>

            <div className="calender-info-date__icon">
              <div className="calender-date pending-red">01</div>
            </div>
            <div className="calender-info-date__description">
              {login.user?.role === "customer"
                ? `Clickable date. This indicates that you have sent your valid payment details 
                and you have to wait until the photographer responds.`
                : `Clickable date. This indicates that you have received the customer's valid 
                paymet details. You can click on this date and download the payment slip sent by 
                your customer and confirm or reject the reservation.`}
            </div>

            <div className="calender-info-date__icon">
              <div className="calender-date confirmed">01</div>
            </div>
            <div className="calender-info-date__description">
              Clickable date. All the dates that have successfully
              been reserved are indicated like this. You can click on each of it to
              see the reservation details.
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default CalenderInfo;
