import React, { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import { sanitize } from "../../../utils/sanitize";
import { isValid } from "../../../utils/validator";

/**
 *
 * @param name
 * @param onChange
 * @returns
 */
const AmountInput = (props) => {
  const [rupees, setRupees] = useState("");
  const [cents, setCents] = useState("");
  const [message, setMessage] = useState(null);
  const [invalid, setInvalid] = useState(false);

  const onChangeRupeesHandler = (event) => {
    const currentRupees = sanitize(event.target.value);
    setRupees(currentRupees);
    onChangeAmountHandler(currentRupees, cents);
  };

  const onChangeCentsHandler = (event) => {
    if (event.target.value.length <= 2) {
      const currentCents = sanitize(event.target.value);
      setCents(currentCents);
      onChangeAmountHandler(rupees, currentCents);
    }
  };

  const onChangeAmountHandler = (curRupees, curCents) => {
    const paidAmount = `${curRupees}.${curCents}`;
    if (isValid("paidAmount", paidAmount) || !paidAmount) {
      setMessage("");
      setInvalid(false);
      props.onChange(paidAmount);
    } else {
      setMessage("⚠ Please enter a valid Date");
      setInvalid(true);
      props.onChange("invalid");
    }
  };

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <Input
          invalid={invalid}
          value={rupees}
          onChange={onChangeRupeesHandler}
          style={{ width: "5rem" }}
          placeholder="10000"
        />
        {" . "}
        <Input
          invalid={invalid}
          value={cents}
          onChange={onChangeCentsHandler}
          style={{ width: "2.5rem" }}
          placeholder="00"
        />
        {" LKR"}
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default AmountInput;
