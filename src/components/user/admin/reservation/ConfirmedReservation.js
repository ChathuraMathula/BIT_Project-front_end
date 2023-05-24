import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../../context/Context";
import useWarningMessage from "../../../../hooks/useWarningMessage";
import GreenButton from "../../../UI/buttons/GreenButton";
import OrangeButton from "../../../UI/buttons/OrangeButton";
import RedButton from "../../../UI/buttons/RedButton";
import CalenderDateState from "../../../UI/calender/CalenderDateState";
import WarningCard from "../../../UI/cards/WarningCard";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import WarningMessageBox from "../../../UI/warnings/WarningMessageBox";
import CostDetails from "../../customer/CostDetails";
import CustomerDetails from "../../customer/CustomerDetails";
import EventDetails from "../../customer/EventDetaills";
import PackageDetails from "../../customer/PackageDetails";
import PaymentDetails from "../../customer/PaymentDetails";
import "./ConfirmedReservation.css";
import UpdateReservation from "./UpdateReservation";

/**
 *
 * @param reservation (object) reservation document
 * @param date (object) date document
 * @param onSuccess handler function for success
 * @returns
 */
const ConfirmedReservation = (props) => {
  const login = useContext(UserLoginContext);

  const [customer, setCustomer] = useState({});
  const [packageDocument, setPackageDocument] = useState({ services: [] });
  const [deleteReservation, setDeleteReservation] = useState(false);

  const [warningMessage, setWarningMessage] = useWarningMessage();

  const [update, setUpdate] = useState(false);

  const reservation = props.reservation;

  const thisDay = props.date.getDate();
  const thisMonth = props.date.getMonth();
  const thisYear = props.date.getFullYear();

  useEffect(() => {
    fetch("http://localhost:3001/user", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username: props.reservation.customer }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((customerDoc) => {
        setCustomer({ ...customerDoc });
      });

    fetch("http://localhost:3001/package/categories")
      .then((res) => res.json())
      .then((categories) => {
        if (categories) {
          const packageCategory = categories.filter((category) => {
            return category.name === props.reservation.category;
          });

          const packageArray = packageCategory[0]?.packages.filter(
            (packageDoc) => packageDoc.name === props.reservation.package
          );

          setPackageDocument({
            ...packageArray[0],
            category: packageCategory[0].name,
          });
        }
      });
  }, [props.reservation]);

  const onClickDeleteNoHandler = (e) => {
    setDeleteReservation(false);
  };

  const onClickDeleteYesHandler = async (e) => {
    await fetch("http://localhost:3001/remove/reservation", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        date: {
          year: thisYear,
          month: thisMonth,
          day: thisDay,
        },
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
  };

  const onClickDeleteHandler = (e) => {
    setDeleteReservation(true);
  };

  const onClickUpdateHandler = (e) => {
    setUpdate(true);
  };

  return (
    <>
      <CalenderDateState>Reserved</CalenderDateState>
      {!deleteReservation && !update ? (
        <>
          <ModalCardContainer>
            <EventDetails reservation={props.reservation} />
          </ModalCardContainer>
          <ModalCardContainer>
            <CustomerDetails username={props.reservation?.customer} />
          </ModalCardContainer>
          <ModalCardContainer>
            <PackageDetails reservation={props.reservation} />
          </ModalCardContainer>
          <ModalCardContainer>
            <CostDetails reservation={props.reservation} />
          </ModalCardContainer>
          <ModalCardContainer>
            <PaymentDetails reservation={props.reservation} />
          </ModalCardContainer>
          
          {login.user.name === "admin" ? (
            <>
              <ButtonContainer>
                <RedButton onClick={onClickDeleteHandler}>Delete</RedButton>
                <OrangeButton onClick={onClickUpdateHandler}>
                  Update
                </OrangeButton>
              </ButtonContainer>
            </>
          ) : null}
        </>
      ) : null}
      {deleteReservation ? (
        <>
          <WarningCard
            warning={`Please make sure that you cannot recover once you delete a
                reservation. Do you really want to delete? 🙄`}
          />
          <WarningMessageBox message={warningMessage} />
          <ButtonContainer>
            <RedButton onClick={onClickDeleteYesHandler}>Yes</RedButton>
            <GreenButton onClick={onClickDeleteNoHandler}>No</GreenButton>
          </ButtonContainer>
        </>
      ) : null}
      {update ? (
        <UpdateReservation
          onSuccess={props.onSuccess}
          date={props.date}
          reservation={props.reservation}
        />
      ) : null}
    </>
  );
};

export default ConfirmedReservation;
