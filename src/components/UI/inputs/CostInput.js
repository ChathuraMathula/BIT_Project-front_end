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
const CostInput = (props) => {
  const [cost, setCost] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const onChangeCostHandler = (event) => {
    const currentCost = sanitize(event.target.value);
    setCost(currentCost);
    if (isValid("integer", currentCost) || !currentCost) {
      setMessage("");
      setInvalid(false)
      props.onChange(currentCost);
    } else {
      setMessage("⚠ Please enter a valid cost. (eg: 12000)");
      setInvalid(true)
      props.onChange("invalid");
    }
  };

  useEffect(() => {
    if (props.value) {
      setCost(props.value);
      props.onChange(props.value)
    }
  }, [props.value]);

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexCenterColumnContainer>
          <Input
            invalid={invalid}
            value={cost}
            onChange={onChangeCostHandler}
            placeholder="LKR"
            style={{ width: "100%" }}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default CostInput;
