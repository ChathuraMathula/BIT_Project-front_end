import React, { useState } from "react";
import FormInput from "../../../UI/form/FormInput";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import "./UpdatePackageBody.css";

/**
 * @param category (string) name of the package category
 * @param package (string) name of the package
 * @param price (string) eg: 120000
 * @param services (string) comma seperated string of services*
 * @param onChangePrice (function) handler for price input value
 * @param onChangeServices (function) handler for services input value
 * @returns 
 */
const UpdatePackageBody = (props) => {
    
  return (
    <>
      <div className="update-package-body__names">
        Category: <span>{props.category}</span>
      </div>
      <div className="update-package-body__names">
        Package: <span>{props.package}</span>
      </div>
      <FormInput
        placeholder="eg: 120000 (LKR)"
        onChange={props.onChangePrice}
        value={props.price}
      >
        Package Price:
      </FormInput>
      <FormInputTextArea
        onChange={props.onChangeServices}
        placeholder="Please add comma separated list of services to be included in the package"
        value={props.services}
      >
        Package Services:
      </FormInputTextArea>
    </>
  );
};

export default UpdatePackageBody;
