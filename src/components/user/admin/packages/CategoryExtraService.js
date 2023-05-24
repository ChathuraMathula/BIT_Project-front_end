import React from "react";
import CloseButton from "../../../UI/buttons/CloseButton";
import "./CategoryExtraService.css";

/**
 *
 * @param service object {string: string, quantifiable: boolean}
 * @param onRemove function (event, index) => {}
 * @returns
 */
const CategoryExtraService = (props) => {
  return (
    <>
      <div className="category-extra-service__container" key={props.key}>
        <CloseButton onClick={event => props.onRemove(event, props.index)}/>
        <div>{`${+props.index + 1}) ${props.service.string}`}</div>
        {props.service.quantifiable ? <span>{`[Quantifiable]`}</span> : null}
      </div>
    </>
  );
};

export default CategoryExtraService;
