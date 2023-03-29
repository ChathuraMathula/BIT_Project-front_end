import React, { useEffect, useState } from "react";
import { sanitize } from "../../../../utils/Sanitizer";
import { isEmpty, isValid } from "../../../../utils/Validator";
import GreenButton from "../../../UI/buttons/GreenButton";
import RedButton from "../../../UI/buttons/RedButton";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import FormInput from "../../../UI/form/FormInput";
import FormSelectOptions from "../../../UI/form/FormSelectOptions";
import FormSubHeading from "../../../UI/form/FormSubHeading";
import CustomerAddExtraServices from "../../customer/CustomerAddExtraServices";
import "./UpdateReservation.css";

/**
 *
 * @param reservation reservation document
 * @param date (object) date document
 * @param onSuccess handler function for success
 * @returns
 */
const UpdateReservation = (props) => {
  const event = props.reservation.event;
  const costs = props.reservation.costs;
  const [eventType, setEventType] = useState(event.type);
  const [eventLocation, setEventLocation] = useState(event.location);
  const [eventBeginTime, setEventBeginTime] = useState(event.beginTime);
  const [eventEndTime, setEventEndTime] = useState(event.endTime);
  const [transportCost, setTransportCost] = useState(costs.transport);
  const [extraServicesCost, setExtraServicesCost] = useState(
    costs.extraServices
  );
  const [advancePayment, setAdvancePayment] = useState(costs.advance);
  const [packageName, setPackageName] = useState(props.reservation.package);
  const [categoryName, setCategoryName] = useState(props.reservation.category);
  const [extraServices, setExtraServices] = useState([]);
  const [selectedExtraServices, setSelectedExtraServices] = useState([]);

  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);

  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const thisDay = props.date.getDate();
  const thisMonth = props.date.getMonth();
  const thisYear = props.date.getFullYear();

  const displayWarning = (message) => {
    setWarningStyles("warning-msg-styles__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  useEffect(() => {
    fetch("http://localhost:3001/package/categories")
      .then((res) => res.json())
      .then((categoryDocuments) => {
        setCategories([...categoryDocuments]);
        if (
          categoryDocuments.some(
            (categoryDoc) => categoryDoc.name === categoryName
          )
        ) {
          for (let categoryDoc of categoryDocuments) {
            if (categoryDoc.name === categoryName) {
              setExtraServices([...categoryDoc.extraServices]);
              setPackages([...categoryDoc.packages]);
              return;
            }
          }
        } else {
          setExtraServices([...categoryDocuments[0].extraServices]);
          setPackages([...categoryDocuments[0].packages]);
          setCategoryName(categoryDocuments[0].name);
          setPackageName(categoryDocuments[0].packages[0].name);
        }
      });
  }, []);

  useEffect(() => {
    for (let categoryDoc of categories) {
      if (categoryDoc.name === categoryName) {
        setExtraServices([...categoryDoc.extraServices]);
        setPackages([...categoryDoc.packages]);
      }
    }
  }, [categoryName]);

  const onChangeEventTypeHandler = (e) => {
    setEventType(sanitize(e.target.value));
  };

  const onChangeEventLocationHandler = (e) => {
    setEventLocation(sanitize(e.target.value));
  };

  const onChangeEventBeginTimeHandler = (e) => {
    setEventBeginTime(sanitize(e.target.value));
  };

  const onChangeEventEndTimeHandler = (e) => {
    setEventEndTime(sanitize(e.target.value));
  };

  const onChangeTransportCostHandler = (e) => {
    setTransportCost(sanitize(e.target.value));
  };
  const onChangeExtraServicesCostHandler = (e) => {
    setExtraServicesCost(sanitize(e.target.value));
  };
  const onChangeAdvancePaymentHandler = (e) => {
    setAdvancePayment(sanitize(e.target.value));
  };

  const onChangePackageCategoryHandler = (e) => {
    setCategoryName(e.target.value);
  };

  const onChangePackageHandler = (e) => {
    setPackageName(e.target.value);
  };

  const onClickUpdateHandler = async (e) => {
    if (
      /^[a-zA-Z\ ]+$/.test(eventType) && // valid name string with spaces
      isValid("address", eventLocation) &&
      !isEmpty(eventType) &&
      !isEmpty(eventLocation) &&
      !isEmpty(categoryName) &&
      !isEmpty(packageName) &&
      isValid("time", eventBeginTime) &&
      isValid("time", eventEndTime)
    ) {
      const selectedPackage = packages.filter((packageDoc) => {
        return packageDoc.name === packageName;
      });
      const costs = {
        transport: +transportCost,
        extraServices: +extraServicesCost,
        advance: +advancePayment,
        package: +selectedPackage[0].price,
      };

      const event = {
        type: eventType,
        location: eventLocation,
        beginTime: eventBeginTime,
        endTime: eventEndTime,
      };

      await fetch("http://localhost:3001/update/reservation", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          date: {
            year: thisYear,
            month: thisMonth,
            day: thisDay,
          },
          costs: costs,
          event: event,
          package: selectedPackage[0].name,
          category: categoryName,
          extraServices: selectedExtraServices,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            if (!data.success) {
              displayWarning("Updating reservation failed. 😐");
            } else if (data.success) {
              props.onSuccess(true);
            }
          }
        });
    } else {
      displayWarning("Input data is invalid. 😐");
    }
  };

  const onAddExtraServiceHandler = (extraServicesArray) => {
    setSelectedExtraServices([...extraServicesArray]);
  };

  return (
    <>
      <ModalCardContainer>
        <FormSubHeading>EVENT DETAILS</FormSubHeading>
        <FormInput
          value={eventType}
          onChange={onChangeEventTypeHandler}
          type="text"
        >
          Event Type:
        </FormInput>
        <FormInput
          value={eventLocation}
          onChange={onChangeEventLocationHandler}
          type="text"
        >
          Event Location:
        </FormInput>
        <FormInput
          value={eventBeginTime}
          onChange={onChangeEventBeginTimeHandler}
          type="text"
        >
          Event Begin Time:
        </FormInput>
        <FormInput
          value={eventEndTime}
          onChange={onChangeEventEndTimeHandler}
          type="text"
        >
          Event EndTime:
        </FormInput>
      </ModalCardContainer>
      <ModalCardContainer>
        <FormSubHeading>COSTS DETAILS</FormSubHeading>
        <FormInput
          value={transportCost}
          onChange={onChangeTransportCostHandler}
          type="text"
        >
          Transport Cost:
        </FormInput>
        <FormInput
          value={extraServicesCost}
          onChange={onChangeExtraServicesCostHandler}
          type="text"
        >
          Extra Services Cost:
        </FormInput>
        <FormInput
          value={advancePayment}
          onChange={onChangeAdvancePaymentHandler}
          type="text"
        >
          Advance Payment:
        </FormInput>
      </ModalCardContainer>
      <ModalCardContainer>
        <FormSubHeading>PACKAGE DETAILS</FormSubHeading>
        <FormSelectOptions
          onChange={onChangePackageCategoryHandler}
          label="Package Category:"
        >
          {categories.map((categoryDocument, i) => {
            return (
              <option
                value={categoryDocument.name}
                selected={
                  categoryDocument.name === categoryName ? "selected" : null
                }
                key={i}
              >
                {categoryDocument.name}
              </option>
            );
          })}
        </FormSelectOptions>
        <FormSelectOptions onChange={onChangePackageHandler} label="Package:">
          {packages.map((packageDocument, i) => {
            return (
              <option
                value={packageDocument.name}
                selected={
                  packageDocument.name === packageName ? "selected" : null
                }
                key={i}
              >
                {packageDocument.name}
              </option>
            );
          })}
        </FormSelectOptions>
      </ModalCardContainer>
      <CustomerAddExtraServices
        extraServices={extraServices}
        reservation={props.reservation}
        onAddExtraService={onAddExtraServiceHandler}
      />
      <div className={"warning-msg__container " + warningStyles}>
        {warningMessage}
      </div>
      <ButtonContainer>
        <RedButton onClick={onClickUpdateHandler}>Update</RedButton>
      </ButtonContainer>
    </>
  );
};

export default UpdateReservation;
