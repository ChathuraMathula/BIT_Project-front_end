import React, { useEffect, useState } from "react";
import Input from "./Input";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import { sanitize } from "../../../utils/sanitize";
import { isValid } from "../../../utils/validator";

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
  const [invalid, setInvalid] = useState(false);

  const onChangeHoursHandler = (event) => {
    if (event.target.value.length <= 2) {
      const currentHours = sanitize(event.target.value);
      setHours(currentHours);
      onChangeHandler(currentHours, minutes);
    }
  };

  const onChangeMinutesHandler = (event) => {
    if (event.target.value.length <= 2) {
      const currentMins = sanitize(event.target.value);
      setMinutes(currentMins);
      onChangeHandler(hours, currentMins);
    }
  };

  const onChangeHandler = (curHours, curMins) => {
    if (!curHours && !curMins) {
      setMessage("");
      setInvalid(false);
      props.onChange("");
    } else {
      const time = `${curHours}:${curMins}`;
      if (isValid("time", time)) {
        setMessage("");
        setInvalid(false);
        props.onChange(time);
      } else {
        setMessage("⚠ Please enter a valid time (eg: 12:00)");
        setInvalid(true);
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
          invalid={invalid}
          value={hours}
          onChange={onChangeHoursHandler}
          style={{ width: "2.5rem" }}
          placeholder="HH"
        />
        {" : "}
        <Input
          invalid={invalid}
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
