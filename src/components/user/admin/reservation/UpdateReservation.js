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
import TimeInput from "../../../UI/inputs/TimeInput";
import AddressInput from "../../../UI/inputs/AddressInput";
import CostInput from "../../../UI/inputs/CostInput";
import WarningMessageBox from "../../../UI/warnings/WarningMessageBox";
import useWarningMessage from "../../../../hooks/useWarningMessage";

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

  const [warningMessage, setWarningMessage] = useWarningMessage();

  const thisDay = props.date.getDate();
  const thisMonth = props.date.getMonth();
  const thisYear = props.date.getFullYear();

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

  const onChangeEventLocationHandler = (address) => {
    setEventLocation(address);
  };

  const onChangeEventBeginTimeHandler = (time) => {
    setEventBeginTime(time);
  };

  const onChangeEventEndTimeHandler = (time) => {
    setEventEndTime(time);
  };

  const onChangeTransportCostHandler = (cost) => {
    setTransportCost(cost);
  };
  const onChangeExtraServicesCostHandler = (cost) => {
    setExtraServicesCost(cost);
  };
  const onChangeAdvancePaymentHandler = (payment) => {
    setAdvancePayment(payment);
  };

  const onChangePackageCategoryHandler = (e) => {
    setCategoryName(e.target.value);
  };

  const onChangePackageHandler = (e) => {
    setPackageName(e.target.value);
  };

  const onClickUpdateHandler = async (e) => {
    if (
      !isEmpty(eventLocation) &&
      !isEmpty(categoryName) &&
      !isEmpty(packageName) &&
      !isEmpty(eventBeginTime) &&
      !isEmpty(eventEndTime) &&
      !isEmpty(transportCost) &&
      !isEmpty(extraServicesCost) &&
      !isEmpty(advancePayment) &&
      eventBeginTime !== "invalid" &&
      eventEndTime !== "invalid" &&
      eventLocation !== "invalid" &&
      transportCost !== "invalid" &&
      extraServicesCost !== "invalid" &&
      advancePayment !== "invalid" 
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
              setWarningMessage("Updating reservation failed.");
            } else if (data.success) {
              props.onSuccess(true);
            }
          }
        });
    } else {
      setWarningMessage("Input data is invalid.");
    }
  };

  const onAddExtraServiceHandler = (extraServicesArray) => {
    setSelectedExtraServices([...extraServicesArray]);
  };

  return (
    <>
      <ModalCardContainer>
        <FormSubHeading>EVENT DETAILS</FormSubHeading>
        <AddressInput
          name="Event Location"
          value={eventLocation}
          onChange={onChangeEventLocationHandler}
        />
        <TimeInput
          name="Event Begin Time"
          onChange={onChangeEventBeginTimeHandler}
          value={eventBeginTime}
        />
        <TimeInput
          name="Event End Time"
          onChange={onChangeEventEndTimeHandler}
          value={eventEndTime}
        />
      </ModalCardContainer>
      <ModalCardContainer>
        <FormSubHeading>COSTS DETAILS</FormSubHeading>

        <CostInput
          name="Transport Cost"
          value={transportCost}
          onChange={onChangeTransportCostHandler}
        />
        <CostInput
          name="Extra Services Cost"
          value={extraServicesCost}
          onChange={onChangeExtraServicesCostHandler}
        />
        <CostInput
          name="Advance Payment"
          value={advancePayment}
          onChange={onChangeAdvancePaymentHandler}
        />
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
                defaultValue={
                  categoryDocument.name === categoryName ? true : false
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
                defaultValue={
                  packageDocument.name === packageName ? true : false
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
      <WarningMessageBox message={warningMessage}/>
      <ButtonContainer>
        <RedButton onClick={onClickUpdateHandler}>Update</RedButton>
      </ButtonContainer>
    </>
  );
};

export default UpdateReservation;
