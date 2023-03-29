import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../context/Context";
import GreenButton from "../../UI/buttons/GreenButton";
import IncreaseButton from "../../UI/buttons/IncreaseButton";
import ReduceButton from "../../UI/buttons/ReduceButton";
import ButtonContainer from "../../UI/containers/ButtonContainer";
import FlexCenterColumnContainer from "../../UI/containers/FlexCenterColumnContainer";
import FlexCenterRowContainer from "../../UI/containers/FlexCenterRowContainer";
import ModalCardContainer from "../../UI/containers/ModalCardContainer";
import FormSelectOptions from "../../UI/form/FormSelectOptions";
import CardContainerTitle from "../../UI/titles/CardContainerTitle";
import "./CustomerAddExtraServices.css";
import CustomerDisplayExtraService from "./CustomerDisplayExtraService";

/**
 *
 * @param extraServices array of extra service objects {string: string, quantifiable: boolean}
 * @param onAddExtraService fucntion ({service: string, quantity: number}) => {}
 * @param reservation
 * @returns
 */
const CustomerAddExtraServices = (props) => {
  const login = useContext(UserLoginContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtraService, setSelectedExtraService] = useState({});
  const [extraServices, setExtraServices] = useState(props.extraServices);
  const [selectedExtraServices, setSelectedExtraServices] = useState([]);

  useEffect(() => {
    setExtraServices([...props.extraServices]);
  }, [props.extraServices]);

  useEffect(() => {
    if (login.user?.role === "admin" && props.reservation) {
      const reservationExtraServices = props.reservation?.extraServices;
      const extraServicesArray = [...extraServices];
      setSelectedExtraServices([...reservationExtraServices]);
      for (let i = 0; i < reservationExtraServices.length; i++) {
        for (let j = 0; j < extraServicesArray.length; j++) {
          if (
            reservationExtraServices[i].name === extraServicesArray[j].string
          ) {
            extraServicesArray.slice(j, 1);
          }
        }
      }
      console.log("-------> Test", extraServicesArray);
      if (extraServicesArray.length === 0) {
        setExtraServices([]);
      } else {

        setExtraServices([...extraServicesArray]);
      }
      props.onAddExtraService([...reservationExtraServices]);
    }
  }, []);

  const onClickReduceHandler = (e) => {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const onClickIncreaseHandler = (e) => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };

  const onClickAddHandler = (e) => {
    if (selectedExtraService) {
      const service = {
        name: selectedExtraService.string,
        quantifiable: selectedExtraService.quantifiable,
        quantity: selectedExtraService.quantifiable ? quantity : null,
      };
      const selectedServicesArray = [...selectedExtraServices, service];
     
      const remainingServicesArray = extraServices.filter((serviceDocument) => {
        return serviceDocument.string !== selectedExtraService.string;
      });
      setSelectedExtraServices([...selectedServicesArray]);
      setExtraServices([...remainingServicesArray]);
      setSelectedExtraService({});

      props.onAddExtraService([...selectedServicesArray]);
    }
  };

  const onSelectExtraServiceHandler = (event) => {
    if (event.target.value > 0) {
      const extraServiceIndex = event.target.value - 1;
      setSelectedExtraService({ ...extraServices[extraServiceIndex] });
    }
    event.target.value = 0;
  };

  const onRemoveExtraServiceHandler = (event, index) => {
    const selectedServicesArray = [...selectedExtraServices];
    let removedExtraService = selectedServicesArray[index];
    removedExtraService = {
      string: removedExtraService.name,
      quantifiable: removedExtraService.quantifiable,
    };
    selectedServicesArray.splice(index, 1);
    if (
      extraServices.every(
        (extraServiceDocument) =>
          extraServiceDocument.string !== removedExtraService.string
      )
    ) {
      setExtraServices([...extraServices, removedExtraService]);
    }
    setSelectedExtraServices([...selectedServicesArray]);
    props.onAddExtraService([...selectedServicesArray]);
  };

  return (
    <>
      <ModalCardContainer>
        <CardContainerTitle>Extra Services</CardContainerTitle>
        <FormSelectOptions
          label="Select Extra Service"
          onChange={onSelectExtraServiceHandler}
        >
          <option value={0}>-- Select --</option>
          {extraServices.length > 0
            ? extraServices.map((extraServiceDocument, index) => {
                return (
                  <>
                    <option value={index + 1} key={index}>
                      {extraServiceDocument.string}
                    </option>
                  </>
                );
              })
            : null}
        </FormSelectOptions>
        <FlexCenterColumnContainer>
          {selectedExtraService?.string ? (
            <div className="extra-service-string__container">
              {selectedExtraService.string}
            </div>
          ) : null}

          <FlexCenterRowContainer>
            {selectedExtraService.quantifiable ? (
              <>
                <div className="quantity-display__container">{`Quantity: ${quantity}`}</div>
                <ReduceButton onClick={onClickReduceHandler} />
                <IncreaseButton onClick={onClickIncreaseHandler} />
              </>
            ) : null}
            {selectedExtraService?.string ? (
              <GreenButton onClick={onClickAddHandler}>Add</GreenButton>
            ) : null}
          </FlexCenterRowContainer>

          {selectedExtraServices.map((extraServiceDocument, index) => {
            return (
              <CustomerDisplayExtraService
                key={index}
                index={index}
                service={extraServiceDocument}
                onRemove={onRemoveExtraServiceHandler}
              />
            );
          })}
        </FlexCenterColumnContainer>
      </ModalCardContainer>
    </>
  );
};

export default CustomerAddExtraServices;
