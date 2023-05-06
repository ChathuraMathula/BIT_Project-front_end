import React, { useEffect, useState } from "react";
import DetailsContainer from "../../UI/containers/DetailsContainer";
import NameValueTitle from "../../UI/other/NameValueTitle";
import NameValueString from "../../UI/other/NameValueString";

/**
 *
 * @param username
 * @returns
 */
const CustomerDetails = (props) => {
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    if (props.username) {
      fetch("http://localhost:3001/user", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ username: props.username }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((customerDoc) => {
          setCustomer({ ...customerDoc });
        });
    }
  }, [props.username]);
  return (
    <>
      <DetailsContainer>
        <NameValueTitle>CUSTOMER DETAILS</NameValueTitle>
        <NameValueString
          name="Name:"
          value={`${customer.firstname} ${customer.lastname}`}
        />
        <NameValueString name="Phone No:" value={customer.phoneNo} />
        <NameValueString name="Email:" value={customer.email} />
        <NameValueString name="Address:" value={customer.address} />
      </DetailsContainer>
    </>
  );
};

export default CustomerDetails;
