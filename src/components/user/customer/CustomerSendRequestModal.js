import React, { useEffect, useState } from "react";
import CalenderDateState from "../../UI/calender/CalenderDateState";
import FormInput from "../../UI/form/FormInput";
import FormSelectOptions from "../../UI/form/FormSelectOptions";
import FormInputTextArea from "../../UI/form/FormInputTextArea";
import "./CustomerSendRequestModal.css";
import { isEmpty, isValid } from "../../../utils/Validator";
import { sanitize } from "../../../utils/Sanitizer";
import ButtonContainer from "../../UI/containers/ButtonContainer";
import GreenButton from "../../UI/buttons/GreenButton";
import ModalCardContainer from "../../UI/containers/ModalCardContainer";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import CustomerAddExtraServices from "./CustomerAddExtraServices";
import ListContainer from "../../UI/containers/ListContainer";
import TimeInput from "../../UI/inputs/TimeInput";
import AddressInput from "../../UI/inputs/AddressInput";
import MessageInput from "../../UI/inputs/MessageInput";

/**
 *
 * @param show (boolean)
 * @param onClose  (function)
 * @param date (object)
 * @param onSuccess (boolean) function handler when success sending the request
 * @returns
 */
const CustomerSendRequestModal = (props) => {
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [extraServices, setExtraServices] = useState([]);
  const [selectedExtraServices, setSelectedExtraServices] = useState([]);

  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

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
      });
  }, []);

  const onSelectCategoryHandler = (event) => {
    if (event.target.value) {
      setCategoryName(event.target.value);

      const selectedCategory = categories.filter((categoryDoument) => {
        return categoryDoument.name === event.target.value;
      });
      setPackages([...selectedCategory[0].packages]);
      setExtraServices([...selectedCategory[0]?.extraServices]);
    } else {
      setCategoryName("");
      setExtraServices([]);
      setPackages([]);
    }
  };

  const onSelectPackageHandler = (event) => {
    if (event.target.value && categoryName) {
      setPackageName(event.target.value);
    } else {
      setPackageName("");
    }
  };

  const eventInputHandler = (event) => {
    setEvent(event.target.value);
  };

  const onChangeLocationHandler = (address) => {
    console.log(address);
    setLocation(address);
  };

  const onChangeMessageHandler = (customerMessage) => {
    console.log(customerMessage);
    setMessage(customerMessage);
  };

  const onChangeBeginTime = (time) => {
    console.log(time);
    setBeginTime(time);
  };

  const onChangeEndTime = (time) => {
    console.log(time);
    setEndTime(time);
  };

  const onClickSendRequestHandler = async (e) => {
    let messageString = "NotFound";
    if (message) {
      messageString = message;
    }
    try {
      if (
        !isEmpty(categoryName) &&
        !isEmpty(packageName) &&
        !isEmpty(location) &&
        !isEmpty(beginTime) &&
        !isEmpty(endTime) &&
        location !== "invalid" &&
        beginTime !== "invalid" &&
        endTime !== "invalid" &&
        message !== "invalid"
      ) {
        
        const data = {
          date: {
            year: sanitize(thisYear),
            month: sanitize(thisMonth),
            day: sanitize(thisDay),
          },
          reservation: {
            category: sanitize(categoryName),
            package: sanitize(packageName),
            event: {
              location: sanitize(location),
              beginTime: beginTime,
              endTime: endTime,
            },
            message: {
              customer:
                messageString === "NotFound" ? "" : sanitize(messageString),
            },
            extraServices: selectedExtraServices,
          },
        };

        await fetch("http://localhost:3001/customer/send/reservation/request", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (!data.success) {
              displayWarning("Sorry..! Sending reservation request failed. 😕");
            } else if (data.success) {
              props.onSuccess(true);
            }
          });
      } else {
        displayWarning("Input data is invalid. Please check again. 😡");
      }
    } catch (error) {
      displayWarning("Sending failed. 😡");
    }
  };

  const onAddExtraServiceHandler = (selectedExtraServicesArray) => {
    console.log(selectedExtraServicesArray);
    setSelectedExtraServices([...selectedExtraServicesArray]);
  };

  return (
    <>
      <CalenderDateState>Reservation Request</CalenderDateState>

      <ModalCardContainer>
        <CardContainerTitle>Package</CardContainerTitle>
        <FormSelectOptions
          id="package-category"
          label="Select Package Category"
          onChange={onSelectCategoryHandler}
        >
          <option value="">-- Select --</option>
          {categories.map((categoryDocument, index) => {
            return (
              <option value={categoryDocument.name} key={index}>
                {categoryDocument.name}
              </option>
            );
          })}
        </FormSelectOptions>
        <FormSelectOptions
          id="package"
          label="Select Package"
          onChange={onSelectPackageHandler}
        >
          <option value="">-- Select --</option>
          {packages.map((packageDocument, index) => {
            return (
              <option value={packageDocument.name} key={index}>
                {packageDocument.name}
              </option>
            );
          })}
        </FormSelectOptions>
      </ModalCardContainer>
      <CustomerAddExtraServices
        extraServices={extraServices}
        onAddExtraService={onAddExtraServiceHandler}
      />
      <ModalCardContainer>
        <CardContainerTitle>About Your Event</CardContainerTitle>

        <TimeInput onChange={onChangeBeginTime} name="Event Begin Time" />
        <TimeInput onChange={onChangeEndTime} name="Event End Time" />

        <AddressInput
          name="Location Address"
          onChange={onChangeLocationHandler}
        />
      </ModalCardContainer>
      <ModalCardContainer>
        <CardContainerTitle>Message</CardContainerTitle>
        <MessageInput
          name="Your Message"
          placeholder="Your additional requests can be asked via this message box."
          onChange={onChangeMessageHandler}
        />
      </ModalCardContainer>

      <div className={"warning-msg__container " + warningStyles}>
        {warningMessage}
      </div>
      <ButtonContainer>
        <GreenButton onClick={onClickSendRequestHandler}>Send</GreenButton>
      </ButtonContainer>
    </>
  );
};

export default CustomerSendRequestModal;
