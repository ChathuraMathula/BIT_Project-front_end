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
 * @param placeholder
 * @returns
 */
const PasswordInput = (props) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const onChangePasswordHandler = (event) => {
    if (event.target.value.length <= 20) {
      const currentPassword = sanitize(event.target.value);
      setPassword(currentPassword);
      if (
        (isValid("password", currentPassword) && currentPassword.length >= 8) ||
        !currentPassword
      ) {
        setMessage("");
        setInvalid(false);
        props.onChange(currentPassword);
      } else {
        setMessage(
          "⚠ Please enter a valid password (at least 8 characters long)"
        );
        setInvalid(true);
        props.onChange("invalid");
      }
    }
  };

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexCenterColumnContainer>
          <Input
            invalid={invalid}
            type="password"
            value={password}
            onChange={onChangePasswordHandler}
            placeholder={props.placeholder}
            style={{ width: "100%" }}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default PasswordInput;
