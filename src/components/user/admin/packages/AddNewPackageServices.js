import React, { useEffect, useState } from "react";
import PackageServiceInput from "../../../UI/inputs/PackageServiceInput";
import PackageService from "./PackageService";

/**
 *
 * @param onChange
 * @param servicesString
 * @returns
 */
const AddNewPackageServices = (props) => {
  const [servicesArray, setServicesArray] = useState([]);

  const onClickAddServiceHandler = (serviceString) => {
    setServicesArray([...servicesArray, serviceString]);
  };

  const onRemoveServiceHandler = (event, serviceIndex) => {
    const tempServiceArray = [];
    for (let i = 0; i < servicesArray.length; i++) {
      if (i !== serviceIndex) {
        tempServiceArray.push(servicesArray[i]);
      } else {
        continue;
      }
    }
    setServicesArray([...tempServiceArray]);
  };

  console.log("+++ ", servicesArray);

  useEffect(() => {
    props.onChange(servicesArray.join(","));
  }, [servicesArray]);

  if (props.servicesString) {
    useEffect(() => {
      setServicesArray([...props.servicesString.split(",")]);
    }, [props.servicesString]);
  }

  return (
    <>
      <PackageServiceInput
        name="Package Services"
        onClickAdd={onClickAddServiceHandler}
      />
      {servicesArray.map((service, index) => {
        return (
          <>
            <PackageService
              key={service}
              service={service}
              index={index}
              onRemove={onRemoveServiceHandler}
            />
          </>
        );
      })}
    </>
  );
};

export default AddNewPackageServices;
