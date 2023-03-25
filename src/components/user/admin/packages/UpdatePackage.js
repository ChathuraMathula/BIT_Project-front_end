import React, { useState } from "react";
import { sanitize } from "../../../../utils/Sanitizer";
import { isValid } from "../../../../utils/Validator";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import Modal from "../../../UI/modal/Modal";
import "./UpdatePackage.css";
import UpdatePackageBody from "./UpdatePackageBody";

/**
 * @param category (string) name of the package category
 * @param package (string) name of the package
 * @param price (string) eg: 120000
 * @param services (string) comma seperated string of services
 * @param categories
 * @returns
 */
const UpdatePackage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const [price, setPrice] = useState(props.price);
  const [services, setServices] = useState(props.services);

  const displayWarning = (message) => {
    setWarningStyles("warning-msg-styles__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const priceInputHandler = (e) => {
    setPrice(e.target.value);
  };

  const packageServicesInputHandler = (e) => {
    setServices(e.target.value);
  };

  const onCloseModalHandler = (e) => {
    setShowModal(false);
  };

  const onBackdropClickHandler = (e) => {
    setShowModal(false);
  };

  const onClickPackageHandler = (e) => {
    setShowModal(true);
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
              console.log(data);
              if (data.success) {
                setShowModal(false);
                props.categories(data.categories);
              } else if (data.error) {
                displayWarning(data.error);
              }
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickUpdatePackageHandler = async (event) => {
    try {
      if (
        isValid("packageCategoryName", sanitize(props.category.trim())) &&
        isValid("name", sanitize(props.package.trim())) &&
        isValid("float", sanitize(price.trim())) &&
        isValid("packageServices", sanitize(services.trim()))
      ) {
        const packageDocument = {
          category: props.category,
          package: props.package,
          price: price,
          services: services,
        };

        await fetch("http://localhost:3001/admin/update/package", {
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
              console.log(data);
              if (data.success) {
                setShowModal(false);
              } else if (data.error) {
                displayWarning(data.error);
              }
            }
          });
      } else {
        displayWarning("Input data is invalid. Please check again. 😡");
      }
    } catch (error) {
      console.log("==> ", error);
    }
  };

  return (
    <>
      <div className="update-package__title" onClick={onClickPackageHandler}>
        {props.package}
      </div>
      <Modal
        show={showModal}
        onClose={onCloseModalHandler}
        heading="UPDATE PACKAGE"
        onBackdropClick={onBackdropClickHandler}
        leftButton="REMOVE"
        onClickLeft={onClickRemovePackageHandler}
        rightButton="UPDATE"
        onClickRight={onClickUpdatePackageHandler}
        warningMessage={warningMessage}
        warningStyles={warningStyles}
      >
        <ModalCardContainer>
          <UpdatePackageBody
            category={props.category}
            package={props.package}
            price={price}
            services={services}
            onChangePrice={priceInputHandler}
            onChangeServices={packageServicesInputHandler}
          />
        </ModalCardContainer>
      </Modal>
    </>
  );
};

export default UpdatePackage;
