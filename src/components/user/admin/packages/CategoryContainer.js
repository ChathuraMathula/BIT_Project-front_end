import React, { useContext } from "react";
import { UserLoginContext } from "../../../../context/Context";
import MiniPlusButton from "../../../UI/buttons/MiniPlusButton";
import PackageCard from "../../../UI/cards/PackageCard";
import FlexCenterRowContainer from "../../../UI/containers/FlexCenterRowContainer";
import RoundedCardContainer from "../../../UI/containers/RoundedCardContainer";
import CardContainerTitle from "../../../UI/titles/CardContainerTitle";
import "./CategoryContainer.css";

/**
 *
 * @param category (string) name of the package category
 * @param packages (array) packages
 * @param categories (function) to get array of categories
 * @returns
 */
const CategoryContainer = (props) => {
  const login = useContext(UserLoginContext);

  

  return (
    <>
      <RoundedCardContainer>
        {/* {login.user.name === "admin" ? <CloseButton /> : null} */}
        <CardContainerTitle>{props.category}</CardContainerTitle>
        {login.user.name === "admin" ? (
          <MiniPlusButton onClick={onClickExtraServices} name="ADD EXTRA SERVICES" />
        ) : null}

        <FlexCenterRowContainer>
          {props.packages.map((packageDocument, i) => {
            return (
              <>
                <PackageCard
                  key={i}
                  category={props.category}
                  packageDocument={packageDocument}
                  categories={props.categories}
                />
              </>
            );
          })}
        </FlexCenterRowContainer>
      </RoundedCardContainer>
    </>
  );
};

export default CategoryContainer;
