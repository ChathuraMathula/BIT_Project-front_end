import React from "react";
import DetailsContainer from "../../UI/containers/DetailsContainer";
import NameValueString from "../../UI/other/NameValueString";
import NameValueTitle from "../../UI/other/NameValueTitle";

/**
 *
 * @param reservation
 * @returns
 */
const CostDetails = (props) => {
  return (
    <>
      <DetailsContainer>
        <NameValueTitle>COST DETAILS</NameValueTitle>
        <NameValueString
          name="Transport Cost:"
          value={`${props.reservation.costs.transport} LKR`}
        />
        <NameValueString
          name="Extra Services Cost:"
          value={`${props.reservation.costs.extraServices} LKR`}
        />
        <NameValueString
          name="Package Price:"
          value={`${props.reservation.costs.package} LKR`}
        />
        <NameValueString
          name="Estimated Total Cost:"
          value={`${
            +props.reservation.costs.transport +
            +props.reservation.costs.extraServices +
            +props.reservation.costs.package
          } LKR`}
        />
        <NameValueString
          name="Advance Payment:"
          value={`${+props.reservation.costs.advance} LKR`}
        />
        <NameValueString
          name="Balance:"
          value={`${
            +props.reservation.costs.transport +
            +props.reservation.costs.extraServices +
            +props.reservation.costs.package -
            +props.reservation.costs.advance
          } LKR`}
        />
      </DetailsContainer>
    </>
  );
};

export default CostDetails;
