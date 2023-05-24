import React, { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../../context/Context";
import BlueButton from "../../UI/buttons/BlueButton";
import IncreaseButton from "../../UI/buttons/IncreaseButton";
import ReduceButton from "../../UI/buttons/ReduceButton";
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
    if (login.user?.role === "admin") {
      const reservationExtraServices = props.reservation?.extraServices;
      const categoryExtraServicesArray = [...props.extraServices].filter(
        (categoryExtraServiceObject) => {
          return !reservationExtraServices.some(
            (reservationExtraService) =>
              reservationExtraService.name === categoryExtraServiceObject.string
          );
        }
      );
      setExtraServices([...categoryExtraServicesArray]);
    } else {
      setExtraServices([...props.extraServices]);
    }
  }, [props.extraServices]);

  useEffect(() => {
    if (login.user?.role === "admin") {
      const reservationExtraServices = props.reservation?.extraServices;
      if (props.reservation) {
        setSelectedExtraServices([...reservationExtraServices]);
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
              <>
                <BlueButton onClick={onClickAddHandler}>Add</BlueButton>
              </>
            ) : null}
          </FlexCenterRowContainer>

          {selectedExtraServices.map((extraServiceDocument, index) => {
            return (
              <React.Fragment key={index}>
                <CustomerDisplayExtraService
                  index={index}
                  service={extraServiceDocument}
                  onRemove={onRemoveExtraServiceHandler}
                />
              </React.Fragment>
            );
          })}
        </FlexCenterColumnContainer>
      </ModalCardContainer>
    </>
  );
};

export default CustomerAddExtraServices;
