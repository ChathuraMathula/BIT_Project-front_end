import React, { useEffect, useState } from "react";
import calenderDays, { THIS_MONTH, THIS_YEAR } from "./helper/calender";
import "./Calender.css";
import CalenderRowContainer from "./CalenderRowContainer";
import CalenderDateContainer from "./CalenderDateContainer";
import CalenderDate from "./CalenderDate";
import InfoButton from "../buttons/InfoButton";
import InfoModal from "../modal/InfoModal";
import CalenderInfo from "./CalenderInfo";

/**
 *
 * @param {object} onClickDate (function) handler to handle click event of the date
 * @returns
 */
const Calender = (props) => {
  const [show, setShow] = useState(false);
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

  useEffect(() => {
    fetch("http://localhost:3001/available/dates")
      .then((res) => res.json())
      .then((datesCollection) => {
        console.log(datesCollection);
      });
  }, []);

  const onClickCalendarInfoHandler = (event) => {
    setShow(true);
  };

  const onCloseCalendarInfoHandler = (event) => {
    setShow(false);
  };

  return (
    <>
      <InfoModal
        heading="Calendar Date Indicators"
        show={show}
        onClose={onCloseCalendarInfoHandler}
      >
        <CalenderInfo />
      </InfoModal>
      <div className="calender-body__container">
        <InfoButton
          onClick={onClickCalendarInfoHandler}
          className="calender-info__button"
        />
        <div className="calender-navigation__container">
          <div
            className={
              month === THIS_MONTH && year === THIS_YEAR
                ? "calender-navigation-button__disabled"
                : "calender-navigation__button"
            }
            onClick={navigationBackHandler}
          >
            ◀
          </div>
          <div className="calender-navigation-display__date">{`${
            monthNames[month - 1]
          }, ${year}`}</div>
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
    </>
  );
};

export default Calender;
