import React, { useState } from "react";
import calenderDays from "./helper/calender";
import "./Calender.css";
import CalenderRowContainer from "./CalenderRowContainer";
import CalenderDateContainer from "./CalenderDateContainer";
import CalenderDate from "./CalenderDate";

const Calender = (props) => {
  console.log(calenderDays(2, 2023));
  const [days, setDays] = useState(calenderDays());

  return (
    <div className="calender-body__container">
      {days.map((value, index) => {
        return (
          <CalenderRowContainer>
            {value.map((date, index) => {
              return (
                <CalenderDateContainer>
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
