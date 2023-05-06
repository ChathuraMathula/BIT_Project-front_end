import React from "react";
import DetailsContainer from "../../UI/containers/DetailsContainer";
import NameValueTitle from "../../UI/other/NameValueTitle";
import NameValueString from "../../UI/other/NameValueString";

/**
 *
 * @param reservation
 * @returns
 */
const PaymentDetails = (props) => {
    
  return (
    <>
      <>
        <DetailsContainer>
          <NameValueTitle>PAYMENT DETAILS</NameValueTitle>
          <NameValueString
            name="Paid Method:"
            value={`By ${props.reservation.payment.method}`}
          />
          {props.payment?.method === "bank" ? (
            <NameValueString
              name="Paid Bank Branch:"
              value={props.reservation.payment.branch}
            />
          ) : null}
          <NameValueString
            name="Paid Amount:"
            value={`${props.reservation.payment.amount} LKR`}
          />
          <NameValueString
            name="Paid Date:"
            value={props.reservation.payment.date}
          />
          <NameValueString
            name="Paid Time:"
            value={props.reservation.payment.time}
          />
        </DetailsContainer>
      </>
    </>
  );
};

export default PaymentDetails;
