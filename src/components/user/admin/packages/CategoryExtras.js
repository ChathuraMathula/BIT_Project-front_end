import React, { useEffect, useState } from "react";
import { sanitize } from "../../../../utils/sanitize";
import GreenButton from "../../../UI/buttons/GreenButton";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import FlexCenterRowContainer from "../../../UI/containers/FlexCenterRowContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import FormInputCheckBox from "../../../UI/form/FormInputCheckBox";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import CardContainerTitle from "../../../UI/titles/CardContainerTitle";
import CategoryExtraService from "./CategoryExtraService";
import "./CategoryExtras.css";

/**
 *
 * @param category
 * @param onSuccess
 */
const CategoryExtras = (props) => {
  const [newServiceString, setNewServiceString] = useState("");
  const [extraServices, setExtraServices] = useState([]);
  const [quantifiable, setQuantifiable] = useState(false);

  const onChangeNewServiceStringHandler = (e) => {
    setNewServiceString(sanitize(e.target.value));
  };

  const onCheckedQuantifiableHandler = (e) => {
    if (e.target.checked) {
      setQuantifiable(true);
    } else {
      setQuantifiable(false);
    }
  };

  const onClickAddExtraServiceHandler = (e) => {
    if (newServiceString) {
      setExtraServices([
        ...extraServices,
        {
          string: newServiceString,
          quantifiable: quantifiable,
        },
      ]);
      setNewServiceString("");
    }
  };

  const onRemoveExtraServiceHandler = (event, index) => {
    let services = [...extraServices];
    services.splice(index, 1);
    setExtraServices([...services]);
  };

  const onClickSaveExtraServicesHandler = async (e) => {
    await fetch(
      "http://localhost:3001/update/package/category/extra/services",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          category: props.category,
          extraServices: extraServices,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        
        if (data.success) {
          props.onSuccess(true);
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:3001/package/categories")
      .then((res) => res.json())
      .then((packageCategoryArray) => {
        for (let packageCategoryDocument of packageCategoryArray) {
          if (packageCategoryDocument.name === props.category) {
            if (packageCategoryDocument.hasOwnProperty("extraServices")) {
              setExtraServices([...packageCategoryDocument.extraServices]);
            }
          }
        }
      });
  }, []);

  return (
    <>
      <CardContainerTitle>{props.category}</CardContainerTitle>
      <ModalCardContainer>
        <FormInputTextArea
          onChange={onChangeNewServiceStringHandler}
          value={newServiceString}
          placeholder="Eg: 16x24 One Wooden Enlargement"
        >
          New Extra Service:
        </FormInputTextArea>
        <FlexCenterRowContainer>
          <FormInputCheckBox
            onClick={onCheckedQuantifiableHandler}
            accentColor="green"
          >
            Quantifiable
          </FormInputCheckBox>
          <GreenButton onClick={onClickAddExtraServiceHandler}>Add</GreenButton>
        </FlexCenterRowContainer>
      </ModalCardContainer>
      {extraServices.length > 0 ? (
        <>
          <ModalCardContainer>
            {extraServices.map((extraService, index) => {
              return (
                <CategoryExtraService
                  key={index}
                  index={index}
                  service={extraService}
                  onRemove={onRemoveExtraServiceHandler}
                />
              );
            })}
          </ModalCardContainer>
        </>
      ) : null}
      <ButtonContainer>
        <GreenButton onClick={onClickSaveExtraServicesHandler}>
          Save
        </GreenButton>
      </ButtonContainer>
    </>
  );
};

export default CategoryExtras;
