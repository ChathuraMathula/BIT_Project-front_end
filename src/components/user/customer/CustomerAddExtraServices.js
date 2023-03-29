import React, { useState } from "react";
import GreenButton from "../../UI/buttons/GreenButton";
import IncreaseButton from "../../UI/buttons/IncreaseButton";
import ReduceButton from "../../UI/buttons/ReduceButton";
import ButtonContainer from "../../UI/containers/ButtonContainer";
import FlexCenterColumnContainer from "../../UI/containers/FlexCenterColumnContainer";
import FlexCenterRowContainer from "../../UI/containers/FlexCenterRowContainer";
import "./CustomerAddExtraServices.css";

/**
 *
 * @param extraService object
 * @param onAddExtraService fucntion ({service: string, quantity: number}) => {}
 * @returns
 */
const CustomerAddExtraServices = (props) => {
  const [quantity, setQuantity] = useState(1);

  const onClickReduceHandler = (e) => {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const onClickIncreaseHandler = (e) => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };

  const onClickAddHandler = (e) => {
    if (props.extraService.quantifiable) {
      props.onAddExtraService({
        service: props.extraService.string,
        quantity: quantity,
      });
    } else {
      props.onAddExtraService({
        service: props.extraService.string,
      });
    }
  };

  return (
    <>
      <FlexCenterColumnContainer>
        <div className="extra-service-string__container">
          {props.extraService.string}
        </div>
        {props.extraService.quantifiable ? (
          <FlexCenterRowContainer>
            <div className="quantity-display__container">{`Quantity: ${quantity}`}</div>
            <ReduceButton onClick={onClickReduceHandler} />
            <IncreaseButton onClick={onClickIncreaseHandler} />
          </FlexCenterRowContainer>
        ) : null}
        <ButtonContainer>
          <GreenButton onClick={onClickAddHandler}>Add</GreenButton>
        </ButtonContainer>
      </FlexCenterColumnContainer>
    </>
  );
};

export default CustomerAddExtraServices;
