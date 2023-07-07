import React, { useState } from "react";
import { sanitize } from "../../../../utils/sanitize";
import { isValid } from "../../../../utils/validator";
import RedButton from "../../../UI/buttons/RedButton";
import WarningCard from "../../../UI/cards/WarningCard";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import ListContainer from "../../../UI/containers/ListContainer";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import NameValueString from "../../../UI/other/NameValueString";
import CardContainerTitle from "../../../UI/titles/CardContainerTitle";
import "./RemovePackageBody.css";

const RemovePackageBody = (props) => {
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const displayWarning = (message) => {
    setWarningStyles("warning-msg-styles__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const onClickRemovePackageHandler = async (event) => {
    try {
      if (
        isValid("packageCategoryName", sanitize(props.category.trim())) &&
        isValid("name", sanitize(props.package.trim()))
      ) {
        const packageDocument = {
          category: props.category,
          package: props.package,
        };

        await fetch("http://localhost:3001/admin/remove/package", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(packageDocument),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              
              if (data.success) {
                props.onSuccess(true);
              } else {
                displayWarning("Sorry... Package could not be removed.");
              }
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalCardContainer>
        <CardContainerTitle>Remove Package</CardContainerTitle>
        <NameValueString name="Category:" value={props.category} />
        <NameValueString name="Package:" value={props.package} />
        <NameValueString name="Price:" value={`${props.price} LKR`} />
        <NameValueString
          name="Services:"
          value={
            props?.services.length > 0 ? (
              <>
                <ListContainer>
                  {props?.services.map((service, index) => {
                    return <li key={index}>{service}</li>;
                  })}
                </ListContainer>
              </>
            ) : (
              "Package Has been Removed"
            )
          }
        />
      </ModalCardContainer>
      <WarningCard
        warning={`Please make sure that you cannot recover once you delete a
        package. Do you really want to delete? 🙄`}
      />
      <div className={"warning-msg__container " + warningStyles}>
        {warningMessage}
      </div>
      <ButtonContainer>
        <RedButton onClick={onClickRemovePackageHandler}>Yes</RedButton>
      </ButtonContainer>
    </>
  );
};

export default RemovePackageBody;
