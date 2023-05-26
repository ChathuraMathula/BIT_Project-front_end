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
const NameInput = (props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const onChangeNameHandler = (event) => {
    const currentName = sanitize(event.target.value);
    setName(currentName);
    if (isValid("name", currentName) || !currentName) {
      setMessage("");
      setInvalid(false);
      props.onChange(currentName);
    } else {
      setMessage("⚠ Please enter a valid name");
      setInvalid(true);
      props.onChange("invalid");
    }
  };

  useEffect(() => {
    if (props.value) {
      setName(props.value);
    }
  }, []);

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexCenterColumnContainer>
          <Input
            invalid={invalid}
            value={name}
            onChange={onChangeNameHandler}
            placeholder={props.placeholder}
            style={{ width: "100%" }}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default NameInput;
