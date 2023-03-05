import React, { useEffect, useState } from "react";
import "./CategoryContainer.css";
import UpdatePackage from "./UpdatePackage";

/**
 *
 * @param category (string) name of the package category
 * @param packages (array) packages
 * @param categories (function) to get array of categories
 * @returns
 */
const CategoryContainer = (props) => {

  return (
    <div className="package-category__container">
      <div className="package-category__title">{props.category}</div>
      {props.packages.map((value, index) => {
        return (
          <UpdatePackage
            category={props.category}
            price={value.price}
            package={value.name}
            services={value.services.join(", ")}
            key={index}
            categories={props.categories}
          />
        );
      })}
    </div>
  );
};

export default CategoryContainer;
