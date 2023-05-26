import React, { useState } from "react";
import { sanitize } from "../../../utils/sanitize";
import { isValid } from "../../../utils/validator";
import IncreaseButton from "../buttons/IncreaseButton";
import FlexRowContainer from "../containers/FlexRowContainer";
import InputWarning from "../warnings/InputWarning";
import Input from "./Input";
import Label from "./Label";

/**
 *
 * @param name
 * @param onClickAdd
 * @returns
 */
const PackageServiceInput = (props) => {
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const onChangeServiceHandler = (event) => {
    const currentService = sanitize(event.target.value);
    setService(currentService);
    if (isValid("packageService", currentService) || !currentService) {
      setMessage("");
      setInvalid(false);
    } else {
      setMessage("⚠ Please enter a valid service text string");
      setInvalid(true);
    }
  };

  const onClickAddHandler = () => {
    if (service && !invalid) {
      props.onClickAdd(service);
      setService("")
    }
  };

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexRowContainer>
          <Input
            invalid={invalid}
            value={service}
            onChange={onChangeServiceHandler}
            placeholder="Enter package service"
            style={{ width: "80%" }}
          />
          <IncreaseButton onClick={onClickAddHandler} />
        </FlexRowContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default PackageServiceInput;
