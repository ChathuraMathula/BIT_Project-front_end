import React, { useState } from "react";
import WarningCard from "../../../UI/cards/WarningCard";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import MessageInput from "../../../UI/inputs/MessageInput";
import FormInputCheckBox from "../../../UI/form/FormInputCheckBox";
import WarningMessageBox from "../../../UI/warnings/WarningMessageBox";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import RedButton from "../../../UI/buttons/RedButton";
import GreenButton from "../../../UI/buttons/GreenButton";
import useWarningMessage from "../../../../hooks/useWarningMessage";
import { isEmpty } from "../../../../utils/Validator";

/**
 *
 * @param thisYear
 * @param thisMonth
 * @param thisDay
 * @param onCancel
 * @param onSuccess
 * @param customer
 * @returns
 */
const ReservationRejection = (props) => {
  const [warningMessage, setWarningMessage] = useWarningMessage();
  const [message, setMessage] = useState("");
  const [isConfirmedRejection, setIsConfirmedRejection] = useState(false);

  const onChangeRejectionMessageHandler = (messageText) => {
    setMessage(messageText);
  };

  const onClickRejectionConfirmHandler = (event) => {
    setIsConfirmedRejection(event.target.checked);
  };

  const onClickSendHandler = async (e) => {
    if (isConfirmedRejection && !isEmpty(message) && message !== "invalid") {
      await fetch("http://localhost:3001/remove/reservation", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          date: {
            year: props.thisYear,
            month: props.thisMonth,
            day: props.thisDay,
          },
          customer: props.customer,
          message: message,
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
              setWarningMessage("Removing reservation failed.");
            } else if (data.success) {
              props.onSuccess(true);
            }
          }
        });
    } else {
      setWarningMessage(
        "Please make sure you entered a valid message and confirm rejection."
      );
    }
  };

  const onClickCancelHandler = (e) => {
    props.onCancel(true);
  };

  return (
    <>
      <WarningCard
        warning={`Please make sure that you cannot recover once you reject a reservation.`}
      />
      <ModalCardContainer>
        <MessageInput
          name="Message"
          placeholder="Reason for rejecting the reservation"
          onChange={onChangeRejectionMessageHandler}
        />

        <FormInputCheckBox
          onClick={onClickRejectionConfirmHandler}
          accentColor="red"
        >
          Confirm Rejection
        </FormInputCheckBox>
      </ModalCardContainer>
      <WarningMessageBox message={warningMessage} />
      <ButtonContainer>
        <RedButton onClick={onClickSendHandler}>Send</RedButton>
        <GreenButton onClick={onClickCancelHandler}>Cancel</GreenButton>
      </ButtonContainer>
    </>
  );
};

export default ReservationRejection;
