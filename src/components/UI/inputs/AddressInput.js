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
 * @param value
 * @param onChange
 * @returns
 */
const AddressInput = (props) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const onChangeNameHandler = (event) => {
    const currentAddressName = sanitize(event.target.value);
    setName(currentAddressName);
    onChangeHandler(currentAddressName, street, city);
  };

  const onChangeStreetHandler = (event) => {
    const currentAddressStreet = sanitize(event.target.value);
    setStreet(currentAddressStreet);
    onChangeHandler(name, currentAddressStreet, city);
  };
  const onChangeCityHandler = (event) => {
    const currentAddressCity = sanitize(event.target.value);
    setCity(currentAddressCity);
    onChangeHandler(name, street, currentAddressCity);
  };

  const onChangeHandler = (curName, curStreet, curCity) => {
    if (curName && curStreet && curCity) {
      const address = `${curName}, ${curStreet}, ${curCity}.`;
      if (isValid("address", address)) {
        props.onChange(address);
        setMessage("");
        setInvalid(false);
      } else {
        setMessage("⚠ Please check again and enter a valid address");
        setInvalid(true);
        props.onChange("invalid");
      }
    } else if (!curName && !curStreet && !curCity) {
      props.onChange("");
      setMessage("");
      setInvalid(false);
    } else {
      setMessage("⚠ Please fill out all address fields properly");
      setInvalid(true);
      props.onChange("invalid");
    }
  };

  useEffect(() => {
    if (props.value) {
      const addressArray = props.value.split(",");
      setName(addressArray[0].trim());
      setStreet(addressArray[1].trim());
      setCity(addressArray[2].trim().replace(".", ""));
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
            value={name}
            onChange={onChangeNameHandler}
            placeholder="Name / Number"
            style={{ width: "100%" }}
          />
          <Input
            invalid={invalid}
            value={street}
            onChange={onChangeStreetHandler}
            placeholder="Street"
            style={{ width: "100%" }}
          />
          <Input
            invalid={invalid}
            value={city}
            onChange={onChangeCityHandler}
            placeholder="City"
            style={{ width: "100%" }}
          />
        </FlexCenterColumnContainer>
        <InputWarning message={message} />
      </Label>
    </>
  );
};

export default AddressInput;
