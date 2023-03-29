import React from "react";
import "./PackageTitle.css";

const PackageTitle = (props) => {
  return (
    <div className="package-title__container">
      <h2>{props.children.toUpperCase()}</h2>
    </div>
  );
};

export default PackageTitle;