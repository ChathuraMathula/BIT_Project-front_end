import React from "react";
import CloseButton from "../../../UI/buttons/CloseButton";
import "./PackageService.css";

/**
 *
 * @param service 
 * @param onRemove function (event, index) => {}
 * @param index
 * @returns
 */
const PackageService = (props) => {
  return (
    <>
      <div className="package-service__container" key={props.key}>
        <CloseButton onClick={event => props.onRemove(event, props.index)}/>
        <div>{`${+props.index + 1}) ${props.service}`}</div>
      </div>
    </>
  );
};

export default PackageService;
