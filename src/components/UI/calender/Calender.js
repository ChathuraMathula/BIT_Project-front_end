import React, { useState } from "react";
import calenderDays, { THIS_MONTH, THIS_YEAR } from "./helper/calender";
import "./Calender.css";
import CalenderRowContainer from "./CalenderRowContainer";
import CalenderDateContainer from "./CalenderDateContainer";
import CalenderDate from "./CalenderDate";

const Calender = (props) => {
  const [days, setDays] = useState(calenderDays());
  const [month, setMonth] = useState(THIS_MONTH);
  const [year, setYear] = useState(THIS_YEAR);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigationBackHandler = (event) => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
      setDays([...calenderDays(12, year - 1)]);
    } else {
      setMonth(month - 1);
      setDays([...calenderDays(month - 1, year)]);
    }
  };

  const navigationNextHandler = (event) => {
    if (month === 12) {
        setMonth(1);
        setYear(year + 1);
        setDays([...calenderDays(1, year + 1)]);
      } else {
        setMonth(month + 1);
        setDays([...calenderDays(month + 1, year)]);
      }
  };

  console.log(days);
  return (
    <div className="calender-body__container">
      <div className="calender-navigation__container">
        <div
          className="calender-navigation__button"
          onClick={navigationBackHandler}
        >
          ◀
        </div>
        <div>{`${monthNames[month - 1]}, ${year}`}</div>
        <div
          className="calender-navigation__button"
          onClick={navigationNextHandler}
        >
          ▶
        </div>
      </div>
      <CalenderRowContainer>
        <CalenderDateContainer>
          <div className="calender-body-day__names">SUN</div>
        </CalenderDateContainer>
        <CalenderDateContainer>
          <div className="calender-body-day__names">MON</div>
        </CalenderDateContainer>
        <CalenderDateContainer>
          <div className="calender-body-day__names">TUE</div>
        </CalenderDateContainer>
        <CalenderDateContainer>
          <div className="calender-body-day__names">WED</div>
        </CalenderDateContainer>
        <CalenderDateContainer>
          <div className="calender-body-day__names">THU</div>
        </CalenderDateContainer>
        <CalenderDateContainer>
          <div className="calender-body-day__names">FRI</div>
        </CalenderDateContainer>
        <CalenderDateContainer>
          <div className="calender-body-day__names">SAT</div>
        </CalenderDateContainer>
      </CalenderRowContainer>
      {days.map((value, index) => {
        return (
          <CalenderRowContainer key={index}>
            {value.map((date, index) => {
              return (
                <CalenderDateContainer key={index}>
                  <CalenderDate date={date} />
                </CalenderDateContainer>
              );
            })}
          </CalenderRowContainer>
        );
      })}
    </div>
  );
};

export default Calender;
