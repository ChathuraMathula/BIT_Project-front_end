import React, { useEffect, useState } from "react";
import CalenderDateState from "../../UI/calender/CalenderDateState";
import FormInput from "../../UI/form/FormInput";
import FormInputTime from "../../UI/form/FormInputTime";
import FormSelectOptions from "../../UI/form/FormSelectOptions";
import FormInputTextArea from "../../UI/form/FormInputTextArea";
import Modal from "../../UI/modal/Modal";
import "./CustomerSendRequestModal.css";
import { isEmpty, isValid } from "../../../utils/Validator";
import { sanitize } from "../../../utils/Sanitizer";

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
  const [event, setEvent] = useState("");
  const [beginHours, setBeginHours] = useState("");
  const [beginMinutes, setBeginMinutes] = useState("");
  const [endHours, setEndHours] = useState("");
  const [endMinutes, setEndMinutes] = useState("");
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
    } else {
      setCategoryName("");
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

  const onChangeBeginHoursHandler = (event) => {
    setBeginHours(validateHours(event.target.value));
  };

  const onChangeBeginMinutesHandler = (event) => {
    setBeginMinutes(validateMinutes(event.target.value));
  };

  const onChangeEndHoursHandler = (event) => {
    setEndHours(validateHours(event.target.value));
  };

  const onChangeEndMinutesHandler = (event) => {
    setEndMinutes(validateMinutes(event.target.value));
  };

  const validateHours = (hour) => {
    if (+hour >= 0 && +hour < 24) {
      return +hour;
    } else {
      return 0;
    }
  };

  const validateMinutes = (minutes) => {
    if (+minutes >= 0 && +minutes < 60) {
      return +minutes;
    } else {
      return 0;
    }
  };

  const onChangeLocationHandler = (event) => {
    setLocation(event.target.value);
  };

  const onChangeMessageHandler = (event) => {
    setMessage(event.target.value);
  };

  const onClickSendRequestHandler = async () => {
    let messageString = "NotFound";
    if (message) {
      messageString = message;
    }
    try {
      if (
        /^[a-zA-Z\ ]+$/.test(event) && // valid name string with spaces
        isValid("address", location) &&
        isValid("message", messageString) &&
        !isEmpty(event) &&
        !isEmpty(location) &&
        !isEmpty(categoryName) &&
        !isEmpty(packageName) &&
        !isEmpty(beginHours) &&
        !isEmpty(beginMinutes) &&
        !isEmpty(endHours) &&
        !isEmpty(endMinutes) &&
        beginHours < endHours
      ) {
        console.log("sent");
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
              type: sanitize(event),
              location: sanitize(location),
              beginTime: `${beginHours} : ${beginMinutes}`,
              endTime: `${endHours} : ${endMinutes}`,
            },
            message: {
              customer:
                messageString === "NotFound" ? "" : sanitize(messageString),
            },
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

  return (
    <>
      <Modal
        show={props.show}
        onClose={props.onClose}
        onBackdropClick={props.onClose}
        heading={props.date.toDateString()}
        leftButton="SEND REQUEST"
        onClickLeft={onClickSendRequestHandler}
        warningMessage={warningMessage}
        warningStyles={warningStyles}
      >
        <div className="customer-send-request-state__container">
          <CalenderDateState>Reservation Request</CalenderDateState>
        </div>
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
        <FormInput
          value={event}
          onChange={eventInputHandler}
          placeholder="eg: Wedding / Birthday Party / Other"
        >
          Event
        </FormInput>
        <FormInputTime
          hours={beginHours}
          minutes={beginMinutes}
          onChangeHours={onChangeBeginHoursHandler}
          onChangeMinutes={onChangeBeginMinutesHandler}
        >
          Event Begin Time:
        </FormInputTime>
        <FormInputTime
          hours={endHours}
          minutes={endMinutes}
          onChangeHours={onChangeEndHoursHandler}
          onChangeMinutes={onChangeEndMinutesHandler}
        >
          Event End Time:
        </FormInputTime>
        <FormInputTextArea
          value={location}
          onChange={onChangeLocationHandler}
          placeholder="Please type the address of the location where the event is planned to be held."
        >
          Location Address
        </FormInputTextArea>
        <FormInputTextArea
          value={message}
          onChange={onChangeMessageHandler}
          placeholder="Your additional requests can be asked via this message box."
        >
          Your Message:
        </FormInputTextArea>
      </Modal>
    </>
  );
};

export default CustomerSendRequestModal;
