import React, { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import { sanitize } from "../../../utils/sanitize";
import { isValid } from "../../../utils/validator";

/**
 *
 * @param name
 * @param onChange
 * @returns
 */
const DateInput = (props) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState(null);
  const [invalid, setInvalid] = useState(false);

  const onChangeDayHandler = (event) => {
    if (event.target.value.length <= 2) {
      const currentDay = sanitize(event.target.value);
      setDay(currentDay);
      onChangeDateHandler(currentDay, month, year);
    }
  };

  const onChangeMonthHandler = (event) => {
    if (event.target.value.length <= 2) {
      const currentMonth = sanitize(event.target.value);
      setMonth(currentMonth);
      onChangeDateHandler(day, currentMonth, year);
    }
  };

  const onChangeYearHandler = (event) => {
    if (event.target.value.length <= 4) {
      const currentYear = sanitize(event.target.value);
      setYear(currentYear);
      onChangeDateHandler(day, month, currentYear);
    }
  };

  const onChangeDateHandler = (curDay, curMonth, curYear) => {
    const date = `${curDay}/${curMonth}/${curYear}`;
    if (isValid("date", date) || !date) {
      setMessage("");
      setInvalid(false);
      props.onChange(date);
    } else {
      setMessage("⚠ Please enter a valid Date");
      setInvalid(true);
      props.onChange("invalid");
    }
  };

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <Input
          invalid={invalid}
          value={day}
          onChange={onChangeDayHandler}
          style={{ width: "2.5rem" }}
          placeholder="DD"
        />
        {" / "}
        <Input
          invalid={invalid}
          value={month}
          onChange={onChangeMonthHandler}
          style={{ width: "2.5rem" }}
          placeholder="MM"
        />
        {" / "}
        <Input
          invalid={invalid}
          value={year}
          onChange={onChangeYearHandler}
          style={{ width: "3.5rem" }}
          placeholder="YYYY"
        />
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default DateInput;
