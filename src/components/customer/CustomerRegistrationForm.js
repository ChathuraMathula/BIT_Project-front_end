import React from "react";
import { Link } from "react-router-dom";
import ProfilePicUpload from "../UI/ProfilePicUpload";
import "./CustomerRegistrationForm.css";

// This component renders the customer registration form/sign up form

const CustomerRegistrationForm = (props) => {
  return (
    <div className="customer-reg-form__container">
      <h1 className="customer-reg-form__heading">Customer Registration Form</h1>
      <div className="customer-reg-form__sub-heading">
        &#9888; Please enter your details to register as a customer
      </div>
      <div className="customer-reg-form__profile-pic-container">
        <ProfilePicUpload />
      </div>

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
            <input type="email" name="email" placeholder="example@gmail.com" />
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
            <button className="customer-reg-form__action-btn">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegistrationForm;
