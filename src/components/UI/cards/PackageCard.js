import React, { useContext, useState } from "react";
import { UserLoginContext } from "../../../context/Context";
import RemovePackageBody from "../../user/admin/packages/RemovePackageBody";
import UpdatePackageBody from "../../user/admin/packages/UpdatePackageBody";
import CloseButton from "../buttons/CloseButton";
import OrangeButton from "../buttons/OrangeButton";
import ButtonContainer from "../containers/ButtonContainer";
import ListContainer from "../containers/ListContainer";
import PackageServicesContainer from "../containers/PackageServicesContainer";
import Modal from "../modal/Modal";
import PackageTitle from "../titles/PackageTitle";
import "./PackageCard.css";

/**
 * @param packageDocument
 * @param onUpdate
 * @returns
 */
const PackageCard = (props) => {
  const login = useContext(UserLoginContext);
  const [showModal, setShowModal] = useState(false);
  const [deletePackage, setDeletePackage] = useState(false);

  const onClickUpdatePackageHandler = (e) => {
    setDeletePackage(false);
    setShowModal(true);
  };

  const onCloseModalHandler = (e) => {
    setShowModal(false);
  };

  const onSuccessHandler = (success) => {
    if (success) {
      setShowModal(false);
    }
  };

  const onDeletePackageHandler = () => {
    setDeletePackage(true);
    setShowModal(true);
  };
  return (
    <>
      <div className="package-card__container">
        {login.user?.name === "admin" ? (
          <CloseButton onClick={onDeletePackageHandler} />
        ) : null}
        <PackageTitle>{props.packageDocument.name}</PackageTitle>
        <PackageServicesContainer>
          <ListContainer>
            {props.packageDocument?.services.map((service, i) => {
              return <li key={i}>{service}</li>;
            })}
          </ListContainer>
        </PackageServicesContainer>
        <div className="package-card__price">{`${props.packageDocument.price} LKR`}</div>

        {login.user?.name === "admin" ? (
          <ButtonContainer>
            <OrangeButton onClick={onClickUpdatePackageHandler}>
              Update
            </OrangeButton>
          </ButtonContainer>
        ) : null}
      </div>
      <Modal
        show={showModal}
        onClose={onCloseModalHandler}
        onBackdropClick={onCloseModalHandler}
      >
        {!deletePackage ? (
          <UpdatePackageBody
            category={props.category}
            package={props.packageDocument.name}
            services={props.packageDocument.services.join(", ")}
            price={props.packageDocument.price}
            onSuccess={onSuccessHandler}
          />
        ) : deletePackage ? (
          <RemovePackageBody
            category={props.category}
            package={props.packageDocument.name}
            price={props.packageDocument.price}
            services={props.packageDocument.services}
            onSuccess={onSuccessHandler}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default PackageCard;
