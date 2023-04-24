import React, { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import { sanitize } from "../../../utils/Sanitizer";
import { isValid } from "../../../utils/Validator";

/**
 *
 * @param name
 * @returns
 */
const TimeInput = (props) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [message, setMessage] = useState(null);

  const onChangeHoursHandler = (event) => {
    const currentHours = sanitize(event.target.value);
    setHours(currentHours);
    const time = `${currentHours}:${minutes}`;
    if (isValid("time", time)) {
      setMessage("");
      props.onChange(time);
    } else {
      setMessage("⚠ Please enter a valid time (eg: 12:00)");
    }
  };

  const onChangeMinutesHandler = (event) => {
    const currentMins = sanitize(event.target.value);
    setMinutes(currentMins);
    const time = `${hours}:${currentMins}`;
    if (isValid("time", time)) {
      setMessage("");
      props.onChange(time);
    } else {
      setMessage("⚠ Please enter a valid time (eg: 12:00)");
      props.onChange("invalid");
    }
  };

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <Input
          value={hours}
          onChange={onChangeHoursHandler}
          style={{ width: "3rem" }}
          placeholder="HH"
        />{" "}
        :{" "}
        <Input
          value={minutes}
          onChange={onChangeMinutesHandler}
          style={{ width: "3rem" }}
          placeholder="MM"
        />
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default TimeInput;
