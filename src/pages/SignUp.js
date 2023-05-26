import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GreenButton from "../components/UI/buttons/GreenButton";
import ButtonContainer from "../components/UI/containers/ButtonContainer";
import CardContainer from "../components/UI/containers/CardContainer";
import FormInputCheckBox from "../components/UI/form/FormInputCheckBox";
import FormUploadProfilePhoto from "../components/UI/form/FormUploadProfilePhoto";
import AddressInput from "../components/UI/inputs/AddressInput";
import EmailInput from "../components/UI/inputs/EmailInput";
import NameInput from "../components/UI/inputs/NameInput";
import PasswordInput from "../components/UI/inputs/PasswordInput";
import PhoneInput from "../components/UI/inputs/PhoneInput";
import UsernameInput from "../components/UI/inputs/UsernameInput";
import CardContainerTitle from "../components/UI/titles/CardContainerTitle";
import { isEmpty } from "../utils/validator";
import "./SignUp.css";

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

  const firstnameInputHandler = (name) => {
    console.log("FirstName: ", name);
    setFirstname(name);
  };

  const lastnameInputHandler = (name) => {
    console.log("LastName: ", name);
    setLastname(name);
  };

  const usernameInputHandler = (usernameText) => {
    console.log("Username: ", usernameText);
    setUsername(usernameText);
  };

  const passwordInputHandler = (passwordText) => {
    console.log("Password: ", passwordText);
    setPassword(passwordText);
  };

  const confirmedPasswordInputHandler = (passwordText) => {
    console.log("Confirmed Password: ", passwordText);
    setConfirmedPassword(passwordText);
  };

  const emailInputHandler = (emailText) => {
    setEmail(emailText);
    console.log("email: ", emailText);
  };

  const phoneNoInputHandler = (phone) => {
    console.log("Phone No: ", phone);
    setPhoneNo(phone);
  };

  const addressInputHandler = (address) => {
    console.log("Address: ", address);
    setAddress(address);
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
        !isEmpty(firstname) &&
        !isEmpty(lastname) &&
        !isEmpty(username) &&
        !isEmpty(password) &&
        !isEmpty(email) &&
        !isEmpty(phoneNo) &&
        !isEmpty(address) &&
        !isEmpty(confirmedPassword)
      ) {
        if (
          firstname !== "invalid" &&
          lastname !== "invalid" &&
          username !== "invalid" &&
          password !== "invalid" &&
          email !== "invalid" &&
          phoneNo !== "invalid" &&
          address !== "invalid" &&
          confirmedPassword !== "invalid"
        ) {
          if (!checked) {
            displayError("Please confirm the declaration.");
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
                displayError("Image size should be less than 2MB.");
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
                    displaySuccess(
                      data.success + " Redirecting to login page... 👉🏻"
                    );
                    setTimeout(() => {
                      navigate("/login", { replace: true });
                    }, 7000);
                  } else if (data.error) {
                    displayError(data.error);
                  }
                }
              });
          } else {
            displayError("Both passwords must be same.");
          }
        } else {
          displayError("Input data is invalid. Please check again.");
        }
      } else {
        displayError("Please fill out all fields properly.");
      }
    } catch (error) {}
  };

  return (
    <>
      <CardContainer>
        <CardContainerTitle>CUSTOMER REGISTRATION</CardContainerTitle>
        <FormUploadProfilePhoto onChange={onChangeImageHandler} />
        <div className="sign-up-form-input__container">
          <div className="sign-up-form-input__col-container">
            <NameInput
              name="First Name"
              onChange={firstnameInputHandler}
              placeholder="John"
            />
            <NameInput
              name="Last Name"
              onChange={lastnameInputHandler}
              placeholder="Doe"
            />
            <PhoneInput name="Phone No" onChange={phoneNoInputHandler} />
            <AddressInput name="Address" onChange={addressInputHandler} />
          </div>

          <div className="sign-up-form-input__col-container">
            <UsernameInput
              name="Username"
              placeholder="johndoe12"
              onChange={usernameInputHandler}
            />
            <PasswordInput
              name="Password"
              placeholder="Your Password"
              onChange={passwordInputHandler}
            />
            <PasswordInput
              name="Confirm Password"
              placeholder="Your Password"
              onChange={confirmedPasswordInputHandler}
            />
            <EmailInput name="Email" onChange={emailInputHandler} />

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
          </div>
        </div>

        <div className={"warning-msg__container " + warningStyles}>
          {warningMessage}
        </div>

        <ButtonContainer>
          <GreenButton onClick={onClickRegisterHandler}>Register</GreenButton>
        </ButtonContainer>
      </CardContainer>
    </>
  );
};

export default SignUp;
