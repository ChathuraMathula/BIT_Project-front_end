import React, { useState } from "react";
import "./SignUp.css";
import FormHeading from "../components/UI/form/FormHeading";
import FormSubHeading from "../components/UI/form/FormSubHeading";
import FormContainer from "../components/UI/form/FormContainer";
import FormUploadProfilePhoto from "../components/UI/form/FormUploadProfilePhoto";
import FormInput from "../components/UI/form/FormInput";
import FormActionButton from "../components/UI/form/FormActionButton";
import FormInputCheckBox from "../components/UI/form/FormInputCheckBox";
import { sanitize } from "../utils/Sanitizer";
import { isValid } from "../utils/Validator";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState("");

  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");
  const [firstnameWarning, setFirstnameWarning] = useState("");
  const [lastnameWarning, setLastnameWarning] = useState("");
  const [usernameWarning, setUsernameWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [confirmedPasswordWarning, setConfirmedPasswordWarning] = useState("");
  const [phoneNoWarning, setPhoneNoWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [addressWarning, setAddressWarning] = useState("");

  const displayError = (message) => {
    setWarningStyles("warning-msg-styles__red");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const displaySuccess = (message) => {
    setWarningStyles("warning-msg-styles__green");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const firstnameInputHandler = (event) => {
    setFirstname(sanitize(event.target.value));
    if (!isValid("name", event.target.value)) {
      setFirstnameWarning("😡 Invalid First Name.");
    } else {
      setFirstnameWarning("");
    }
  };

  const lastnameInputHandler = (event) => {
    setLastname(sanitize(event.target.value));
    if (!isValid("name", event.target.value)) {
      setLastnameWarning("😡 Invalid Last Name.");
    } else {
      setLastnameWarning("");
    }
  };

  const usernameInputHandler = (event) => {
    setUsername(sanitize(event.target.value));
    if (!isValid("username", event.target.value)) {
      setUsernameWarning("😡 Invalid Username.");
    } else {
      setUsernameWarning("");
    }
  };

  const passwordInputHandler = (event) => {
    setPassword(sanitize(event.target.value));
    if (!isValid("password", event.target.value)) {
      setPasswordWarning("😡 Invalid Password.");
    } else {
      setPasswordWarning("");
    }
  };

  const confirmedPasswordInputHandler = (event) => {
    setConfirmedPassword(sanitize(event.target.value));
    if (!isValid("password", event.target.value)) {
      setConfirmedPasswordWarning("😡 Invalid Password.");
    } else {
      setConfirmedPasswordWarning("");
    }
  };

  const emailInputHandler = (event) => {
    setEmail(sanitize(event.target.value));
    if (!isValid("email", event.target.value)) {
      setEmailWarning("😡 Invalid Email.");
    } else {
      setEmailWarning("");
    }
  };

  const phoneNoInputHandler = (event) => {
    setPhoneNo(sanitize(event.target.value));
    if (!isValid("phoneNo", event.target.value)) {
      setPhoneNoWarning("😡 Invalid Phone Number.");
    } else {
      setPhoneNoWarning("");
    }
  };

  const addressInputHandler = (event) => {
    setAddress(sanitize(event.target.value));
    if (!isValid("address", event.target.value)) {
      setAddressWarning("😡 Invalid Address.");
    } else {
      setAddressWarning("");
    }
  };

  const onChangeImageHandler = (file) => {
    if (file) {
      setImage(file);
    }
  };

  const onClickCheckedHandler = (event) => {
    setChecked(event.target.checked);
  };

  const onClickRegisterHandler = async () => {
    try {
      if (
        isValid("firstname", firstname) &&
        isValid("lastname", lastname) &&
        isValid("username", username) &&
        isValid("password", password) &&
        isValid("email", email) &&
        isValid("phoneNo", phoneNo) &&
        isValid("address", address) &&
        isValid("confirmedPassword", confirmedPassword)
      ) {
        if (!checked) {
          displayError("Please confirm the declaration. 😒");
          return;
        } else if (password === confirmedPassword) {
          const formData = new FormData();
          formData.append("username", username.trim());
          formData.append("firstname", firstname.trim());
          formData.append("lastname", lastname.trim());
          formData.append("password", password.trim());
          formData.append("email", email.trim());
          formData.append("phoneNo", phoneNo.trim());
          formData.append("address", address.trim());

          if (image) {
            if (image.size < 200000000) {
              formData.append("image", image);
            } else {
              displayError("Image size should be less than 2MB. 😒");
              return;
            }
          }

          await fetch("http://localhost:3001/signup", {
            method: "POST",
            credentials: "include",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                if (data.success) {
                  displaySuccess(data.success + " Redirecting to login page... 👉🏻");
                  setTimeout(() => {
                    navigate("/login", { replace: true });
                  }, 7000);
                } else if (data.error) {
                  displayError(data.error);
                }
              }
            });
        } else {
          displayError("Both passwords don't match. 😡");
        }
      } else {
        displayError("Input data is invalid. Please check again. 😡");
      }
    } catch (error) {}
  };

  return (
    <>
      <FormHeading>Customer Registration Form</FormHeading>
      <FormContainer className="sign-up-form__container">
        <p>&#9888; Please enter your details to register as a customer</p>
        <FormUploadProfilePhoto onChange={onChangeImageHandler} />
        <div className="sign-up-form-input__container">
          <div className="sign-up-form-input__col-container">
            <FormInput
              value={firstname}
              onChange={firstnameInputHandler}
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Janaka"
              warning={firstnameWarning}
            >
              First Name:
            </FormInput>

            <FormInput
              value={lastname}
              onChange={lastnameInputHandler}
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Ranasinghe"
              warning={lastnameWarning}
            >
              Last Name:
            </FormInput>

            <FormInput
              value={phoneNo}
              onChange={phoneNoInputHandler}
              type="text"
              id="phoneNo"
              name="phoneNo"
              placeholder="070-XXXXXXX"
              warning={phoneNoWarning}
            >
              Phone No:
            </FormInput>

            <FormInput
              value={address}
              onChange={addressInputHandler}
              type="text"
              id="address"
              name="address"
              placeholder="No 35, Kurunegala Rd, Polgahawela"
              warning={addressWarning}
            >
              Address:
            </FormInput>
          </div>

          <div className="sign-up-form-input__col-container">
            <FormInput
              value={username}
              onChange={usernameInputHandler}
              type="text"
              id="username"
              name="username"
              placeholder="janakaran12"
              warning={usernameWarning}
            >
              Username:
            </FormInput>

            <FormInput
              value={password}
              onChange={passwordInputHandler}
              type="password"
              id="password"
              name="password"
              placeholder="your password"
              warning={passwordWarning}
            >
              Password:
            </FormInput>

            <FormInput
              value={confirmedPassword}
              onChange={confirmedPasswordInputHandler}
              type="password"
              id="confirmedPassword"
              name="confirmedPassword"
              placeholder="your password"
              warning={confirmedPasswordWarning}
            >
              Confirm Password:
            </FormInput>

            <FormInput
              value={email}
              onChange={emailInputHandler}
              type="text"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              warning={emailWarning}
            >
              Email:
            </FormInput>
          </div>
        </div>

        <div className={"warning-msg__container " + warningStyles}>
          {warningMessage}
        </div>

        <div className="sign-up-form-input__declaration">
          <FormInputCheckBox
            onClick={onClickCheckedHandler}
            accentColor="green"
          >
            Confirm
          </FormInputCheckBox>
          <div>
            I hereby declare that the information given above is true and
            accurate to the best of my knowledge.
          </div>
        </div>

        <div className="sign-up-form-input__action">
          <FormActionButton to="/">Cancel</FormActionButton>
          <FormActionButton onClick={onClickRegisterHandler}>
            Register
          </FormActionButton>
        </div>
      </FormContainer>
    </>
  );
};

export default SignUp;
