import React, { useEffect, useState } from "react";
import { sanitize } from "../../../utils/sanitize";
import { isValid } from "../../../utils/validator";
import GreenButton from "../../UI/buttons/GreenButton";
import ButtonContainer from "../../UI/containers/ButtonContainer";
import CardContainer from "../../UI/containers/CardContainer";
import FlexCenterColumnContainer from "../../UI/containers/FlexCenterColumnContainer";
import FormInput from "../../UI/form/FormInput";
import FormInputTextArea from "../../UI/form/FormInputTextArea";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import "./UpdatePersonalDetails.css";

const UpdatePersonalDetails = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [summary, setSummary] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankName, setBankName] = useState("");

  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const [firstnameWarning, setFirstnameWarning] = useState("");
  const [lastnameWarning, setLastnameWarning] = useState("");
  const [summaryWarning, setSummaryWarning] = useState("");
  const [bankAccountNoWarning, setBankAccountNoWarning] = useState("");
  const [bankNameWarning, setBankNameWarning] = useState("");

  useEffect(() => {
    const formData = new FormData();
    formData.append("username", "photographer");

    fetch("http://localhost:3001/user", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((photographer) => {
        if (photographer) {
          console.log(photographer);
          setFirstname(photographer.firstname);
          setLastname(photographer.lastname);
          setSummary(photographer.summary);
          setBankAccountNo(photographer.bankAccountNo);
          setBankName(photographer.bankName);
        }
      });
  }, []);

  const displayError = (message) => {
    setWarningStyles("warning-msg-styles__red");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const displaySuccess = (message) => {
    setWarningStyles("warning-msg-styles__green");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const firstnameInputHandler = (event) => {
    setFirstname(sanitize(event.target.value));
    if (!isValid("name", event.target.value)) {
      setFirstnameWarning("😡 Invalid First Name.");
    } else {
      setFirstnameWarning("");
    }
  };

  const lastnameInputHandler = (event) => {
    setLastname(sanitize(event.target.value));
    if (!isValid("name", event.target.value)) {
      setLastnameWarning("😡 Invalid Last Name.");
    } else {
      setLastnameWarning("");
    }
  };

  const summaryInputHandler = (event) => {
    setSummary(sanitize(event.target.value));
    if (!isValid("summary", event.target.value)) {
      setSummaryWarning("😡 Invalid Summary");
    } else {
      setSummaryWarning("");
    }
  };

  const bankNameInputHandler = (event) => {
    setBankName(sanitize(event.target.value));
    if (!isValid("bankName", event.target.value)) {
      setBankNameWarning("😡 Invalid Bank Name.");
    } else {
      setBankNameWarning("");
    }
  };

  const bankAccountNoInputHandler = (event) => {
    setBankAccountNo(sanitize(event.target.value));
    if (!isValid("bankAccountNo", event.target.value)) {
      setBankAccountNoWarning("😡 Invalid Bank Account Number.");
    } else {
      setBankAccountNoWarning("");
    }
  };

  const onClickSaveHandler = async (event) => {
    event.preventDefault();

    try {
      if (
        isValid("name", firstname) &&
        isValid("name", lastname) &&
        isValid("summary", summary) &&
        isValid("bankName", bankName) &&
        isValid("bankAccountNo", bankAccountNo)
      ) {
        const formData = new FormData();
        formData.append("username", "photographer");
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("summary", summary);
        formData.append("bankName", bankName);
        formData.append("bankAccountNo", bankAccountNo);

        await fetch("http://localhost:3001/photographer/update/intro/data", {
          method: "POST",
          credentials: "include",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (data.success) {
                displaySuccess(data.success);
              } else if (data.error) {
                displayError(data.error);
              }
            } else {
              throw "error";
            }
          })
          .catch((error) => {
            if (error) {
              displayError("Sorry...! 😟 Save failed.");
            }
          });
      } else {
        displayError("Input data is invalid. Please check again. 😡");
      }
    } catch (error) {
      displayError("An error occurred. 😑");
    }
  };

  return (
    <CardContainer>
      <CardContainerTitle>PERSONAL DETAILS</CardContainerTitle>
      <FlexCenterColumnContainer>
        <FormInput
          className="photographer-personal-details__input"
          type="text"
          id="firstname"
          name="firstname"
          placeholder="eg: John"
          value={firstname}
          onChange={firstnameInputHandler}
          warning={firstnameWarning}
        >
          Firstname:
        </FormInput>
        <FormInput
          className="photographer-personal-details__input"
          type="text"
          id="lastname"
          name="lastname"
          placeholder="eg: Doe"
          value={lastname}
          onChange={lastnameInputHandler}
          warning={lastnameWarning}
        >
          Lastname:
        </FormInput>
        <FormInputTextArea
          className="photographer-personal-details__input photographer-summary__input"
          type="text"
          id="summary"
          name="summary"
          placeholder="Summary description to display."
          value={summary}
          onChange={summaryInputHandler}
          warning={summaryWarning}
          rows="3"
        >
          Summary:
        </FormInputTextArea>
        <FormInput
          className="photographer-personal-details__input"
          type="text"
          id="bankName"
          name="bankName"
          placeholder="eg: People's Bank"
          value={bankName}
          onChange={bankNameInputHandler}
          warning={bankNameWarning}
        >
          Bank Name:
        </FormInput>
        <FormInput
          className="photographer-personal-details__input"
          type="text"
          id="bankAccountNo"
          name="bankAccountNo"
          placeholder="eg: 8000000000"
          value={bankAccountNo}
          onChange={bankAccountNoInputHandler}
          warning={bankAccountNoWarning}
        >
          Bank Account Number:
        </FormInput>
      </FlexCenterColumnContainer>

      <div className={"warning-msg__container " + warningStyles}>
        {warningMessage}
      </div>
      <ButtonContainer>
        <GreenButton onClick={onClickSaveHandler}>Save</GreenButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default UpdatePersonalDetails;
