import React from "react";
import CloseButton from "../../UI/buttons/CloseButton";
import "./CustomerDisplayExtraService.css";

/**
 * 
 * @param service object {name: string, quantity: number} 
 * @param onRemove function (event, index) => {}
 * @returns 
 */
const CustomerDisplayExtraService = (props) => {
  return (
    <>
      <div
        className="customer-display-extra-service__container"
        key={props.key}
      >
        <CloseButton onClick={(event) => props.onRemove(event, props.index)} />
        <div>{`${+props.index + 1}) ${props.service.name}${
          props.service.quantity ? ` [Quantity: ${props.service.quantity}]` : ""
        }`}</div>
      </div>
    </>
  );
};

export default CustomerDisplayExtraService;
