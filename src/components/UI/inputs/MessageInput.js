import React, { useState } from "react";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import FlexCenterColumnContainer from "../containers/FlexCenterColumnContainer";
import { sanitize } from "../../../utils/Sanitizer";
import { isValid } from "../../../utils/Validator";
import TextArea from "./TextArea";

/**
 *
 * @param name
 * @param placeholder
 * @param onChange
 * @returns
 */
const MessageInput = (props) => {
  const [textMessage, setTextMessage] = useState("");
  const [message, setMessage] = useState("");

  const onChangeTextMessageHandler = (event) => {
    const currentTextMessage = sanitize(event.target.value);
    setTextMessage(currentTextMessage);
    if (currentTextMessage) {
      if (isValid("message", currentTextMessage)) {
        setMessage("");
        props.onChange(currentTextMessage);
      } else {
        setMessage("⚠ You have entered invalid characters");
        props.onChange("invalid");
      }
    } else {
        setMessage("");
        props.onChange("");
    }
  };

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexCenterColumnContainer>
          <TextArea
            value={textMessage}
            onChange={onChangeTextMessageHandler}
            placeholder={props.placeholder}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default MessageInput;
