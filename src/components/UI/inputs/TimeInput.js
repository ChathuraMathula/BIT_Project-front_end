import React, { useEffect, useState } from "react";
import Input from "./Input";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import { sanitize } from "../../../utils/Sanitizer";
import { isValid } from "../../../utils/Validator";

/**
 *
 * @param name
 * @param onChange
 * @param value
 * @returns
 */
const TimeInput = (props) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [message, setMessage] = useState(null);

  const onChangeHoursHandler = (event) => {
    if (event.target.value.length <= 2) {
      const currentHours = sanitize(event.target.value);
      setHours(currentHours);
      const time = `${currentHours}:${minutes}`;
      if (isValid("time", time)) {
        setMessage("");
        props.onChange(time);
      } else {
        setMessage("⚠ Please enter a valid time (eg: 12:00)");
        props.onChange("invalid");
      }
    }
  };

  const onChangeMinutesHandler = (event) => {
    if (event.target.value.length <= 2) {
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
    }
  };

  useEffect(() => {
    if (props.value) {
      const timeArray = props.value.split(":");
      setHours(timeArray[0]);
      setMinutes(timeArray[1]);
    }
  }, []);

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <Input
          value={hours}
          onChange={onChangeHoursHandler}
          style={{ width: "2.5rem" }}
          placeholder="HH"
        />
        {" : "}
        <Input
          value={minutes}
          onChange={onChangeMinutesHandler}
          style={{ width: "2.5rem" }}
          placeholder="MM"
        />
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default TimeInput;
