import React from "react";
import NameValueTitle from "../../UI/other/NameValueTitle";
import DetailsContainer from "../../UI/containers/DetailsContainer";
import NameValueString from "../../UI/other/NameValueString";
import ListContainer from "../../UI/containers/ListContainer";

/**
 *
 * @param reservation
 * @returns
 */
const PackageDetails = (props) => {
  return (
    <>
      <DetailsContainer>
        <NameValueTitle>PACKAGE DETAILS</NameValueTitle>
        <NameValueString name="Category:" value={props.reservation.category} />
        <NameValueString name="Package:" value={props.reservation.package} />
        <NameValueString
          name="Package Price:"
          value={`${props.reservation.packagePrice} LKR`}
        />
        <NameValueString
          name="Package Services:"
          value={
            <>
              <ListContainer>
                {props.reservation.packageServices.length > 0
                  ? props.reservation.packageServices.map((service, index) => {
                      return <li key={service}>{service}</li>;
                    })
                  : "Package Has been Removed"}
              </ListContainer>
            </>
          }
        />
        {props.reservation?.extraServices.length > 0 ? (
          <>
            <NameValueString
              name="Extra Services:"
              value={
                <>
                  <ListContainer>
                    {props.reservation?.extraServices.map((service, index) => {
                      if (service.quantity) {
                        return (
                          <li
                            key={service.name}
                          >{`${service.name} [Quantity: ${service.quantity}]`}</li>
                        );
                      } else {
                        return <li key={service.name}>{service.name}</li>;
                      }
                    })}
                  </ListContainer>
                </>
              }
            />
          </>
        ) : null}
      </DetailsContainer>
    </>
  );
};

export default PackageDetails;
