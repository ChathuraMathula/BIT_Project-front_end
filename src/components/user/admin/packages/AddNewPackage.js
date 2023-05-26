import React, { useState } from "react";
import { isValid } from "../../../../utils/validator";
import PlusButton from "../../../UI/buttons/PlusButton";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import FormInput from "../../../UI/form/FormInput";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import FormSelectOptions from "../../../UI/form/FormSelectOptions";
import Modal from "../../../UI/modal/Modal";
import "./AddNewPackage.css";
import AddNewPackageServices from "./AddNewPackageServices";
import GreenButton from "../../../UI/buttons/GreenButton";
import ButtonContainer from "../../../UI/containers/ButtonContainer";
import WarningMessageBox from "../../../UI/warnings/WarningMessageBox";
import useWarningMessage from "../../../../hooks/useWarningMessage";

/**
 *
 * @param categories (array) category documents
 * @param onAddCategory (function) handler retrieve categories once add them
 * @returns
 */
const AddNewPackage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("new");
  const [newCategory, setNewCategory] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageServices, setPackageServices] = useState("");
  const [price, setPrice] = useState("");

  const [warningMessage, setWarningMessage] = useWarningMessage("");

  const setBackToDefaultValues = () => {
    setCategory("new");
    setPackageName("");
    setPackageServices("");
    setPrice("");
    setNewCategory("");
  };

  const onClickAddPackageModalHandler = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const onCloseAddPackageHandler = (event) => {
    setShowModal(false);
    setBackToDefaultValues();
  };

  const onBackdropClickHandler = (event) => {
    setShowModal(false);
    setBackToDefaultValues();
  };

  const onChangePackageCategoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const newCategoryInputHandler = (event) => {
    setNewCategory(event.target.value);
  };

  const packageNameInputHandler = (event) => {
    setPackageName(event.target.value);
  };

  const packageServicesInputHandler = (servicesString) => {
    setPackageServices(servicesString);
  };

  const priceInputHandler = (event) => {
    setPrice(event.target.value);
  };

  const onClickAddPackageHandler = async (event) => {
    try {
      let categoryName = "";
      if (category === "new" && newCategory && newCategory !== "new") {
        categoryName = newCategory.trim();
      } else {
        categoryName = category.trim();
      }

      if (
        isValid("packageCategoryName", categoryName) &&
        isValid("name", packageName) &&
        isValid("float", price) &&
        isValid("packageServices", packageServices)
      ) {
        const packageCategoryDocument = {
          category: categoryName,
          package: packageName,
          price: price,
          services: packageServices,
        };

        await fetch("http://localhost:3001/admin/add/package", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(packageCategoryDocument),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              console.log(data);
              if (data.success) {
                props.onAddCategory(data.categories);
                setShowModal(false);
              } else if (data.error) {
                setWarningMessage(data.error);
              }
            }
          });
      } else {
        setWarningMessage("Input data is invalid. Please check again.");
      }
    } catch (error) {}
  };

  return (
    <>
      <PlusButton
        onClick={onClickAddPackageModalHandler}
        name="ADD NEW PACKAGE"
      />
      <Modal
        show={showModal}
        onClose={onCloseAddPackageHandler}
        heading="ADD NEW PACKAGE"
        onBackdropClick={onBackdropClickHandler}
      >
        <ModalCardContainer>
          <FormSelectOptions
            id="packageCategories"
            label="Package Category:"
            onChange={onChangePackageCategoryHandler}
          >
            <option value="new">Add New Category</option>
            {props.categories.map((value, index) => {
              return (
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              );
            })}
          </FormSelectOptions>

          {category === "new" ? (
            <FormInput
              placeholder="eg: Weddig Photography"
              onChange={newCategoryInputHandler}
              value={newCategory}
            >
              Add a new category:
            </FormInput>
          ) : null}
          <FormInput
            placeholder="eg: Platinum"
            onChange={packageNameInputHandler}
            value={packageName}
          >
            Package Name:
          </FormInput>
          <FormInput
            placeholder="eg: 120000 (LKR)"
            onChange={priceInputHandler}
            value={price}
          >
            Package Price:
          </FormInput>
          <AddNewPackageServices onChange={packageServicesInputHandler} />
          <WarningMessageBox message={warningMessage} />
        </ModalCardContainer>
          <ButtonContainer>
            <GreenButton onClick={onClickAddPackageHandler}>Add</GreenButton>
          </ButtonContainer>
      </Modal>
    </>
  );
};

export default AddNewPackage;
