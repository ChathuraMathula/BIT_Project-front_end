import React from "react";
import CalenderDateState from "../../UI/calender/CalenderDateState";
import ModalCardContainer from "../../UI/containers/ModalCardContainer";
import "./PendingPhotographerCosts.css";
import EventDetails from "./EventDetaills";
import PackageDetails from "./PackageDetails";

/**
 * 
 * @param reservation 
 * @returns 
 */
const PendingPhotographerCosts = (props) => {
  return (
    <>
      <CalenderDateState>Pending Photographer's Costs</CalenderDateState>
      <ModalCardContainer>
        <div className="pending-reservation-photographer-costs-notice">
          Please wait... 😊 Your photographer will respond soon with cost
          details.
        </div>
      </ModalCardContainer>
      <ModalCardContainer>
        <EventDetails reservation={props.reservation} />
      </ModalCardContainer>
      <ModalCardContainer>
        <PackageDetails reservation={props.reservation} />
      </ModalCardContainer>
    </>
  );
};

export default PendingPhotographerCosts;
