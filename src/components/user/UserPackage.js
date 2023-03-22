import React, { useState } from "react";
import "./UserPackage.css";

/**
 *
 * @param packages  array of package documents
 * @returns
 */
const UserPackage = (props) => {
  const [packageIndex, setPackageIndex] = useState(0);

  const nextPackage = () => {
    if (packageIndex === props.packages.length - 1) {
      setPackageIndex(0);
    } else {
      setPackageIndex(packageIndex + 1);
    }
  };

  const previousPackage = () => {
    if (packageIndex === 0) {
      setPackageIndex(props.packages.length - 1);
    } else {
      setPackageIndex(packageIndex - 1);
    }
  };

  return (
    <>
      {props.packages[packageIndex] ? (
        <div className="user-packages-category__container">
          <div onClick={previousPackage}>◄</div>
          <div className="user-packages__container">
            <div className="user-package">
              <div>{props.packages[packageIndex]?.name}</div>
              <ul className="user-package-services__container">
                {props.packages[packageIndex]?.services.map(
                  (service, index) => {
                    return <li key={index}>{service}</li>;
                  }
                )}
              </ul>
              <div>{props.packages[packageIndex]?.price} LKR</div>
            </div>
          </div>
          <div onClick={nextPackage}>►</div>
        </div>
      ) : null}
    </>
  );
};

export default UserPackage;
