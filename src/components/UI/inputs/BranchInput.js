import React, { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import InputWarning from "../warnings/InputWarning";
import { sanitize } from "../../../utils/Sanitizer";
import { isValid } from "../../../utils/Validator";
import FlexCenterColumnContainer from "../containers/FlexCenterColumnContainer";

/**
 *
 * @param name
 * @param onChange
 * @returns
 */
const BranchInput = (props) => {
  const [bankBranch, setBankBranch] = useState("");
  const [message, setMessage] = useState(null);
  const [invalid, setInvalid] = useState(false);

  const onChangeBankBranchHandler = (event) => {
    const curBranch = sanitize(event.target.value);
    setBankBranch(curBranch);

    const branch = `${curBranch}`;
    if (isValid("bankBranchName", branch) || !branch) {
      setMessage("");
      setInvalid(false);
      props.onChange(branch);
    } else {
      setMessage("⚠ Please enter a valid bank branch name. (Eg: POLGAHAWELA)");
      setInvalid(true);
      props.onChange("invalid");
    }
  };

  return (
    <>
      <Label>
        {props.name ? `${props.name}: ` : null}
        <FlexCenterColumnContainer>
          <Input
            invalid={invalid}
            value={bankBranch}
            onChange={onChangeBankBranchHandler}
            style={{ width: "100%" }}
            placeholder="Ex: POLGAHAWELA"
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default BranchInput;
