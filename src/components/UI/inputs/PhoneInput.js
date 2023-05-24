import React, { useEffect, useState } from "react";
import Input from "./Input";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import FlexCenterColumnContainer from "../containers/FlexCenterColumnContainer";
import { sanitize } from "../../../utils/sanitize";
import { isValid } from "../../../utils/validator";

/**
 *
 * @param name
 * @param onChange
 * @param value
 * @returns
 */
const PhoneInput = (props) => {
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const onChangePhoneNoHandler = (event) => {
    if (event.target.value.length <= 10) {
      const currentPhoneNo = sanitize(event.target.value);
      setPhoneNo(currentPhoneNo);
      if (isValid("phoneNo", currentPhoneNo) || !currentPhoneNo) {
        setMessage("");
        setInvalid(false);
        props.onChange(currentPhoneNo);
      } else {
        setMessage("⚠ Please enter a valid phone number");
        setInvalid(true);
        props.onChange("invalid");
      }
    }
  };

  useEffect(() => {
    if (props.value) {
      setPhoneNo(props.value);
      props.onChange(props.value);
    }
  }, [props.value]);

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexCenterColumnContainer>
          <Input
            invalid={invalid}
            value={phoneNo}
            onChange={onChangePhoneNoHandler}
            placeholder="0701234567"
            style={{ width: "100%" }}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default PhoneInput;
