import React, { useEffect, useState } from "react";
import socket from "../../utils/socket";
import CardContainer from "../UI/containers/CardContainer";
import FormHeading from "../UI/form/FormHeading";
import FormSubHeading from "../UI/form/FormSubHeading";
import CardContainerTitle from "../UI/titles/CardContainerTitle";
import UserPackage from "./UserPackage";
import "./UserPackages.css";

const UserPackages = (props) => {
  const [packageCategories, setPackageCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/package/categories")
      .then((res) => res.json())
      .then((categoriesArray) => {
        setPackageCategories([...categoriesArray]);
      });

    socket.on("packageCategories", (categoriesArray) => {
      setPackageCategories([...categoriesArray]);
    });
  }, []);

  return (
    <>
      <CardContainerTitle>PACKAGES</CardContainerTitle>

      <div className="package-categories__container">
        {packageCategories.map((category, index) => {
          if (category.packages?.length > 0) {
            return (
              <div className="packages__container">
                <CardContainer key={index}>
                  <FormSubHeading>{category.name}</FormSubHeading>
                  <UserPackage packages={category.packages} />
                </CardContainer>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default UserPackages;
