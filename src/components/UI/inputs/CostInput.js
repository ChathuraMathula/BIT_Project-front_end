import React, { useState } from "react";
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
 * @returns
 */
const CostInput = (props) => {
  const [cost, setCost] = useState("");
  const [message, setMessage] = useState("");

  const onChangeCostHandler = (event) => {
    const currentCost = sanitize(event.target.value);
    setCost(currentCost);
    if (isValid("integer", currentCost)) {
        setMessage("");
        props.onChange(currentCost);
    } else {
        setMessage("⚠ Please enter a valid cost. (eg: 12000)");
        props.onChange("invalid");
    }
  };

  

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexCenterColumnContainer>
          <Input
            value={cost}
            onChange={onChangeCostHandler}
            placeholder="LKR"
            style={{ width: "100%" }}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message}/>
      </Label>
    </>
  );
};

export default CostInput;
