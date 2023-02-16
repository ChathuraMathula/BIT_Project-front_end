import React from "react";
import { Link } from "react-router-dom";
import FormActionButton from "../UI/form/FormActionButton";
import FormContainer from "../UI/form/FormContainer";
import FormHeading from "../UI/form/FormHeading";
import FormInput from "../UI/form/FormInput";
import FormInputCheckBox from "../UI/form/FormInputCheckBox";
import FormSubHeading from "../UI/form/FormSubHeading";
import FormUploadProfilePhoto from "../UI/form/FormUploadProfilePhoto";
import ProfilePicUpload from "../UI/ProfilePicUpload";
import "./CustomerRegistrationForm.css";

// This component renders the customer registration form/sign up form

const CustomerRegistrationForm = (props) => {
  return (
    <>
      <div className="customer-registration-form__container">
        <FormContainer>
          <FormHeading>Customer Registration Form</FormHeading>
          <FormSubHeading>
            &#9888; Please enter your details to register as a customer
          </FormSubHeading>
          <FormUploadProfilePhoto />
          <div>
            <FormInput>First Name:</FormInput>
            <FormInput>Last Name:</FormInput>
            <FormInput>Phone No:</FormInput>
            <FormInput>Address:</FormInput>
          </div>
          <div>
            <FormInput>Username:</FormInput>
            <FormInput>Password:</FormInput>
            <FormInput>Confirm Password:</FormInput>
            <FormInput>Email:</FormInput>
          </div>
          <FormInputCheckBox accentColor="red">Confirm</FormInputCheckBox>
          <div>
            I hereby declare that the information given above is true and
            accurate to the best of my knowledge.
          </div>
          <div>
            <FormActionButton to="/">Cancel</FormActionButton>
            <FormActionButton>Register</FormActionButton>
          </div>
        </FormContainer>
      </div>
      <div className="customer-reg-form__container">
        <form className="customer-reg-form__inputs">
          <div className="customer-reg-form__input-col">
            <div className="customer-reg-form__input-item">
              <label for="username">First Name:</label>
              <input type="text" name="username" placeholder="Janaka" />
            </div>
            <div className="customer-reg-form__input-item">
              <label for="lastname">Last Name:</label>
              <input type="text" name="lastname" placeholder="Ranasinghe" />
            </div>
            <div className="customer-reg-form__input-item">
              <label for="phone_no">Phone No:</label>
              <input type="tel" name="phone_no" placeholder="070-XXXXXXX" />
            </div>
            <div className="customer-reg-form__input-item">
              <label for="postal_address">Address:</label>
              <input
                type="text"
                name="postal_address"
                placeholder="No 35, Kurunegala Rd, Polgahawela"
              />
            </div>
          </div>

          <div className="customer-reg-form__input-col">
            <div className="customer-reg-form__input-item">
              <label for="username">Username:</label>
              <input type="text" name="username" placeholder="janakaran12" />
            </div>
            <div className="customer-reg-form__input-item">
              <label for="password">Password:</label>
              <input type="password" name="password" placeholder="123@#$%" />
            </div>
            <div className="customer-reg-form__input-item">
              <label for="password">Confirm Password:</label>
              <input type="password" name="password" placeholder="123@#$%" />
            </div>
            <div className="customer-reg-form__input-item">
              <label for="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div className="customer-reg-form__confirmations-container">
            <div className="customer-reg-form__confirmation-item confirmation-checkbox">
              <label for="confirm">Confirm</label>
              <input type="checkbox" name="confirm" />
            </div>
            <div className="customer-reg-form__confirmation-item confirmation-declaration">
              I hereby declare that the information given above is true and
              accurate to the best of my knowledge.
            </div>
            <div className="customer-reg-form__confirmation-item action-buttons">
              <Link className="customer-reg-form__action-btn" to="/">
                Cancel
              </Link>
              <button className="customer-reg-form__action-btn">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerRegistrationForm;
