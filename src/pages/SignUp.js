import React, { useState } from "react";
import "./SignUp.css";
import CustomerRegistrationForm from "../components/customer/CustomerRegistrationForm";
import FormHeading from "../components/UI/form/FormHeading";
import FormSubHeading from "../components/UI/form/FormSubHeading";
import FormContainer from "../components/UI/form/FormContainer";
import FormUploadProfilePhoto from "../components/UI/form/FormUploadProfilePhoto";
import FormInput from "../components/UI/form/FormInput";
import FormActionButton from "../components/UI/form/FormActionButton";
import FormInputCheckBox from "../components/UI/form/FormInputCheckBox";
import { sanitize } from "../utils/Sanitizer";
import { isEmpty, isValid } from "../utils/Validator";

const SignUp = (props) => {
  let customerData = {};
  let checked = false;
  let image = {};

  const inputValuesHandler = (inputValues) => {
    customerData = { ...customerData, ...inputValues };
    console.log("Customer Data: ", customerData);
  };

  const imageHandler = (imageFile) => {
    image = imageFile;
    console.log("Customer image: ", image);
  };

  const isCheckedHandler = (isChecked) => {
    checked = isChecked;
    console.log("Customer is checked: ", checked);
  };

  const onClickRegisterHandler = async () => {
    if (!customerData && Object.keys(customerData).length !== 8) {
      // all fields must be filled properly.
    } else {
      const isExistingUser = await fetch("http://localhost:3001/users")
        .then((res) => res.json())
        .then((users) => {
          console.log("Users => ", users);
          return users.some((user) => user.username === customerData.username);
        })
        .catch((err) => {
          if (err) {
            console.log("Sign-up error: (Existing Username) ", err);
          }
        });
      console.log("Is existing user: ", isExistingUser);
      if (isExistingUser) {
        // Username Already Exists.
      } else {
        if (customerData.password !== customerData.confirmedPassword) {
          // Passwords did not match.
        } else {
          if (!checked) {
            // Please Confirm the Declaration.
          } else {
            const formData = new FormData();

            let keys = Object.keys(customerData);
            for (let key of keys) {
              formData.append(key, customerData[key]);
            }

            if (image) {
              formData.append("image", image);
            }

            await fetch("http://localhost:3001/users", {
              method: "POST",
              body: formData,
              credentials: "include",
              mode: "no-cors",
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          }
        }
      }
    }
  };

  return (
    <>
      <FormContainer className="sign-up-form__container">
        <FormHeading>Customer Registration Form</FormHeading>
        <FormSubHeading>
          &#9888; Please enter your details to register as a customer
        </FormSubHeading>
        <FormUploadProfilePhoto value={imageHandler} />
        <div className="sign-up-form-input__container">
          <div className="sign-up-form-input__col-container">
            <FormInput
              value={inputValuesHandler}
              required={true}
              validateType="name"
              type="text"
              id="customer-firstname"
              name="firstname"
              placeholder="Janaka"
            >
              First Name:
            </FormInput>

            <FormInput
              value={inputValuesHandler}
              required={true}
              validateType="name"
              type="text"
              id="customer-lastname"
              name="lastname"
              placeholder="Ranasinghe"
            >
              Last Name:
            </FormInput>

            <FormInput
              value={inputValuesHandler}
              required={true}
              validateType="phoneNo"
              type="text"
              id="customer-phone_number"
              name="phoneNo"
              placeholder="070-XXXXXXX"
            >
              Phone No:
            </FormInput>

            <FormInput
              value={inputValuesHandler}
              required={true}
              validateType="address"
              type="text"
              id="customer-address"
              name="address"
              placeholder="No 35, Kurunegala Rd, Polgahawela"
            >
              Address:
            </FormInput>
          </div>

          <div className="sign-up-form-input__col-container">
            <FormInput
              value={inputValuesHandler}
              required={true}
              validateType="username"
              type="text"
              id="customer-username"
              name="username"
              placeholder="janakaran12"
            >
              Username:
            </FormInput>

            <FormInput
              value={inputValuesHandler}
              required={true}
              validateType="password"
              type="password"
              id="customer-password"
              name="password"
              placeholder="your password"
            >
              Password:
            </FormInput>

            <FormInput
              value={inputValuesHandler}
              required={true}
              validateType="password"
              type="password"
              id="customer-password-confirm"
              name="confirmedPassword"
              placeholder="your password"
            >
              Confirm Password:
            </FormInput>

            <FormInput
              value={inputValuesHandler}
              required={true}
              validateType="email"
              type="text"
              id="customer-email"
              name="email"
              placeholder="example@gmail.com"
            >
              Email:
            </FormInput>
          </div>
        </div>
        <div id="sign-up-form__warning"></div>
        <div className="sign-up-form-input__declaration">
          <FormInputCheckBox isChecked={isCheckedHandler} accentColor="red">
            Confirm
          </FormInputCheckBox>
          <div>
            I hereby declare that the information given above is true and
            accurate to the best of my knowledge.
          </div>
        </div>
        <div className="sign-up-form-input__action">
          <FormActionButton to="">Cancel</FormActionButton>
          <FormActionButton onClick={onClickRegisterHandler}>
            Register
          </FormActionButton>
        </div>
      </FormContainer>
    </>
  );
};

export default SignUp;
