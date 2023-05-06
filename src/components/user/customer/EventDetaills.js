import React from "react";
import DetailsContainer from "../../UI/containers/DetailsContainer";
import NameValueTitle from "../../UI/other/NameValueTitle";
import NameValueString from "../../UI/other/NameValueString";

/**
 *
 * @param reservation
 * @returns
 */
const EventDetails = (props) => {
  return (
    <>
      <DetailsContainer>
        <NameValueTitle>EVENT DETAILS</NameValueTitle>
        <NameValueString
          name="Event Location:"
          value={props.reservation.event.location}
        />
        <NameValueString
          name="Event Time:"
          value={`From ${props.reservation.event.beginTime} to ${props.reservation.event.endTime}`}
        />
      </DetailsContainer>
    </>
  );
};

export default EventDetails;
