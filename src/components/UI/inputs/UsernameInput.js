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
 * @param placeholder
 * @returns
 */
const UsernameInput = (props) => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const onChangeUsernameHandler = (event) => {
    const currentUsername = sanitize(event.target.value);
    setUsername(currentUsername);
    if (isValid("username", currentUsername) || !currentUsername) {
      setMessage("");
      setInvalid(false);
      props.onChange(currentUsername);
    } else {
      setMessage("⚠ Please enter a valid username");
      setInvalid(true);
      props.onChange("invalid");
    }
  };

  useEffect(() => {
    if (props.value) {
      setUsername(props.value);
    }
  }, []);

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexCenterColumnContainer>
          <Input
            invalid={invalid}
            value={username}
            onChange={onChangeUsernameHandler}
            placeholder={props.placeholder}
            style={{ width: "100%" }}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default UsernameInput;
