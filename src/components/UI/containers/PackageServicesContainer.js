import React from "react";
import "./PackageServicesContainer.css";

const PackageServicesContainer = (props) => {
  return (
    <div className="package-services__container">
      <ul>{props.children}</ul>
    </div>
  );
};

export default PackageServicesContainer;
