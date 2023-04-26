import React, { useEffect, useState } from "react";
import Input from "./Input";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import FlexCenterColumnContainer from "../containers/FlexCenterColumnContainer";
import { sanitize } from "../../../utils/Sanitizer";
import { isValid } from "../../../utils/Validator";

/**
 *
 * @param name
 * @param onChange
 * @param value
 * @returns
 */
const EmailInput = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const onChangeEmailHandler = (event) => {
    const currentEmail = sanitize(event.target.value);
    setEmail(currentEmail);
    if (isValid("email", currentEmail) || !currentEmail) {
      setMessage("");
      setInvalid(false);
      props.onChange(currentEmail);
    } else {
      setMessage("⚠ Please enter a valid email");
      setInvalid(true);
      props.onChange("invalid");
    }
  };

  useEffect(() => {
    if (props.value) {
      setEmail(props.value);
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
            value={email}
            onChange={onChangeEmailHandler}
            placeholder="example@gmail.com"
            style={{ width: "100%" }}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default EmailInput;
