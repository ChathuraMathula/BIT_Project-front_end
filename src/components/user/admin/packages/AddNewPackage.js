import React, { useState } from "react";
import { isValid } from "../../../../utils/Validator";
import ModalCardContainer from "../../../UI/containers/ModalCardContainer";
import FormInput from "../../../UI/form/FormInput";
import FormInputTextArea from "../../../UI/form/FormInputTextArea";
import FormSelectOptions from "../../../UI/form/FormSelectOptions";
import Modal from "../../../UI/modal/Modal";
import "./AddNewPackage.css";

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

  const packageServicesInputHandler = (event) => {
    setPackageServices(event.target.value);
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
                displayWarning(data.error);
              }
            }
          });
      } else {
        displayWarning("Input data is invalid. Please check again. 😡");
      }
    } catch (error) {}
  };

  return (
    <>
      <div
        onClick={onClickAddPackageModalHandler}
        className="add-new-package__button"
      >
        ADD NEW PACKAGE
      </div>
      <Modal
        show={showModal}
        onClose={onCloseAddPackageHandler}
        heading="ADD NEW PACKAGE"
        onBackdropClick={onBackdropClickHandler}
        leftButton="Add Package"
        onClickLeft={onClickAddPackageHandler}
        warningMessage={warningMessage}
        warningStyles={warningStyles}
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
          <FormInputTextArea
            onChange={packageServicesInputHandler}
            placeholder="Please add comma separated list of services to be included in the package"
            value={packageServices}
          >
            Package Services:
          </FormInputTextArea>
        </ModalCardContainer>
      </Modal>
    </>
  );
};

export default AddNewPackage;
