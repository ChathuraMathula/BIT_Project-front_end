import React, { useState } from "react";
import { sanitize } from "../../../../utils/sanitize";
import { isEmpty, isValid } from "../../../../utils/validator";
import OrangeButton from "../../../UI/buttons/OrangeButton";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import CostInput from "../../../UI/inputs/CostInput";
import NameValueString from "../../../UI/other/NameValueString";
import CardContainerTitle from "../../../UI/titles/CardContainerTitle";
import AddNewPackageServices from "./AddNewPackageServices";
import "./UpdatePackageBody.css";

/**
 * @param category (string) name of the package category
 * @param package (string) name of the package
 * @param price (string) eg: 120000
 * @param services (string) comma seperated string of services*
 * @param onChangePrice (function) handler for price input value
 * @param onChangeServices (function) handler for services input value
 * @param onSuccess
 * @returns
 */
const UpdatePackageBody = (props) => {
  const [initialPrice, setInitialPrice] = useState(props.price);
  const [price, setPrice] = useState("");
  const [services, setServices] = useState("");

  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const displayWarning = (message) => {
    setWarningStyles("warning-msg-styles__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const onUpdatePackageHandler = async (e) => {
    try {
      if (
        price !== "invalid" &&
        !isEmpty(price) &&
        isValid("packageCategoryName", sanitize(props.category.trim())) &&
        isValid("name", sanitize(props.package.trim())) &&
        isValid("packageServices", sanitize(services.trim()))
      ) {
        const packageDocument = {
          category: props.category,
          package: props.package,
          price: price,
          services: services,
        };

        await fetch("http://localhost:3001/admin/update/package", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(packageDocument),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              console.log(data);
              if (data.success) {
                props.onSuccess(true);
              } else if (data.error) {
                displayWarning(data.error);
              }
            }
          });
      } else {
        displayWarning("Input data is invalid. Please check again. 😡");
      }
    } catch (error) {
      console.log("==> ", error);
    }
  };

  const onChangePriceHandler = (priceInputValue) => {
    setPrice(priceInputValue);
  };

  const onChangeServicesHandler = (servicesString) => {
    setServices(servicesString);
  };

  return (
    <>
      <ModalCardContainer>
        <CardContainerTitle>Update Package</CardContainerTitle>
        <NameValueString name="Category:" value={props.category} />
        <NameValueString name="Package:" value={props.package} />

        <CostInput
          name="Package Price"
          value={initialPrice}
          onChange={onChangePriceHandler}
        />
        <AddNewPackageServices
          onChange={onChangeServicesHandler}
          servicesString={props.services}
        />
        <div className={"warning-msg__container " + warningStyles}>
          {warningMessage}
        </div>
        <ButtonContainer>
          <OrangeButton onClick={onUpdatePackageHandler}>Update</OrangeButton>
        </ButtonContainer>
      </ModalCardContainer>
    </>
  );
};

export default UpdatePackageBody;
