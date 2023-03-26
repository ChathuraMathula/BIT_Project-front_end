import React, { useState } from "react";
import { sanitize } from "../../../../utils/Sanitizer";
import { isValid } from "../../../../utils/Validator";
import OrangeButton from "../../../UI/buttons/OrangeButton";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import FormInput from "../../../UI/form/FormInput";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import NameValueString from "../../../UI/other/NameValueString";
import CardContainerTitle from "../../../UI/titles/CardContainerTitle";
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
  const [price, setPrice] = useState(props.price);
  const [services, setServices] = useState(props.services);

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
        isValid("packageCategoryName", sanitize(props.category.trim())) &&
        isValid("name", sanitize(props.package.trim())) &&
        isValid("float", sanitize(price.trim())) &&
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

  const onChangePriceHandler = (e) => {
    setPrice(sanitize(e.target.value));
  };

  const onChangeServicesHandler = (e) => {
    setServices(sanitize(e.target.value));
  };

  return (
    <>
      <ModalCardContainer>
        <CardContainerTitle>Update Package</CardContainerTitle>
        <NameValueString name="Category:" value={props.category} />
        <NameValueString name="Package:" value={props.package} />

        <FormInput
          placeholder="eg: 120000 (LKR)"
          onChange={onChangePriceHandler}
          value={price}
        >
          Package Price:
        </FormInput>
        <FormInputTextArea
          onChange={onChangeServicesHandler}
          placeholder="Please add comma separated list of services to be included in the package"
          value={services}
        >
          Package Services:
        </FormInputTextArea>
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
