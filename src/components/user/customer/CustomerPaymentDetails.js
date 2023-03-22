import React, { useEffect, useState } from "react";
import { sanitize } from "../../../utils/Sanitizer";
import { isValid } from "../../../utils/Validator";
import CalenderDateState from "../../UI/calender/CalenderDateState";
import ModalCardContainer from "../../UI/containers/ModalCardContainer";
import FormInput from "../../UI/form/FormInput";
import UploadSVG from "../../UI/SVG/UploadSVG";
import "./CustomerPaymentDetails.css";

/**
 *
 * @param date
 * @param onSuccess
 * @param reservation
 * @returns
 */
const CustomerPaymentDetails = (props) => {
  let noticeString =
    "Please upload a scanned copy of your bank payment slip in .jpeg format. Make sure the bank seal is visible clearly. (image size should be less than 2MB)";
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [screenshotNotice, setScreenshotNotice] = useState(noticeString);
  const [photographer, setPhotographer] = useState({});

  const [paidBranch, setPaidBranch] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [paidTime, setPaidTime] = useState("");
  const [paymentSlipPhoto, setPaymentSlipPhoto] = useState(null);

  const [warningMessage, setWarningMessage] = useState("");
  const [warningStyles, setWarningStyles] = useState("");

  const [rejected, setRejected] = useState(false);

  const [uploadBtnStyles, setUploadBtnStyles] = useState("");

  const thisDay = props.date.getDate();
  const thisMonth = props.date.getMonth();
  const thisYear = props.date.getFullYear();

  useEffect(() => {
    if (props.reservation?.endsAt) {
      const endDate = new Date(props.reservation.endsAt);
      setInterval(() => {
        const thisDate = new Date();
        let remainingTime = endDate.getTime() - thisDate.getTime(); // miliseconds

        let remainingHours = Math.floor(remainingTime / 1000 / 60 / 60);
        if (remainingHours < 10) {
          remainingHours = remainingHours.toString().padStart(2, "0");
        }
        remainingTime -= remainingHours * 1000 * 60 * 60;

        let remainingMinutes = Math.floor(remainingTime / 1000 / 60);
        if (remainingMinutes < 10) {
          remainingMinutes = remainingMinutes.toString().padStart(2, "0");
        }
        remainingTime -= remainingMinutes * 1000 * 60;

        let remainingSeconds = Math.floor(remainingTime / 1000);
        if (remainingSeconds < 10) {
          remainingSeconds = remainingSeconds.toString().padStart(2, "0");
        }

        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      }, 1000);
    }

    fetch("http://localhost:3001/photographer/details")
      .then((res) => res.json())
      .then((photographerDocument) => {
        if (photographerDocument) {
          setPhotographer({ ...photographerDocument });
        }
      });
  }, []);

  const displayWarning = (message) => {
    setWarningStyles("login-form-warning__white");
    setWarningMessage(message);
    setTimeout(() => {
      setWarningStyles("");
      setWarningMessage("");
    }, 5000);
  };

  const onClickByBankHandler = (e) => {
    setPaymentMethod("bank");
    noticeString =
      "Please upload a scanned copy of your bank payment slip in .jpeg format. Make sure the bank seal is visible clearly. (image size should be less than 2MB)";
    setScreenshotNotice(noticeString);
  };
  const onClickByOnlineBankingHandler = (e) => {
    setPaymentMethod("online banking");
    noticeString =
      "Please upload a screenshot of your payment in .jpeg format. (image size should be less than 2MB)";
    setScreenshotNotice(noticeString);
  };

  const onChangePaidBranch = (e) => {
    setPaidBranch(sanitize(e.target.value));
  };

  const onChangePaidAmount = (e) => {
    setPaidAmount(sanitize(e.target.value));
  };

  const onChangePaidDate = (e) => {
    setPaidDate(sanitize(e.target.value));
  };

  const onChangePaidTime = (e) => {
    setPaidTime(sanitize(e.target.value));
  };

  const onClickRejectHandler = (e) => {
    setRejected(true);
  };

  const onClickRejectNoHandler = (e) => {
    setRejected(false);
  };

  const onClickRejectYesHandler = async (e) => {
    await fetch("http://localhost:3001/remove/reservation", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        date: {
          year: thisYear,
          month: thisMonth,
          day: thisDay,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          if (!data.success) {
            displayWarning("Removing reservation failed. 😐");
          } else if (data.success) {
            props.onSuccess(true);
          }
        }
      });
  };

  const onChangePaymentSlipHandler = (e) => {
    const file = e.target.files[0];
    if (file.type === "image/jpeg" && file.size <= 200000000) {
      setPaymentSlipPhoto(file);
      setUploadBtnStyles("customer-payment-details-screenshot__hold");
    } else {
      setPaymentSlipPhoto(null);
      setUploadBtnStyles("");
    }
  };

  const onClickSendPaymentDetailsHandler = async (e) => {
    if (paymentMethod === "bank") {
      if (
        isValid("bankBranchName", paidBranch) &&
        isValid("paidAmount", paidAmount) &&
        isValid("date", paidDate) &&
        isValid("time", paidTime) &&
        paymentSlipPhoto
      ) {
        const formData = new FormData();
        formData.append("year", thisYear);
        formData.append("month", thisMonth);
        formData.append("day", thisDay);
        formData.append("paymentMethod", paymentMethod);
        formData.append("paidBranch", paidBranch);
        formData.append("paidDate", paidDate);
        formData.append("paidTime", paidTime);
        formData.append("paidAmount", paidAmount);
        formData.append("paymentSlip", paymentSlipPhoto);

        await fetch(
          "http://localhost:3001/customer/send/reservation/payment/details",
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              props.onSuccess(true);
            }
          });
      } else {
        displayWarning("Input data is invalid. 😡 Please check and try again.");
      }
    } else if (paymentMethod === "online banking") {
      if (
        isValid("paidAmount", paidAmount) &&
        isValid("date", paidDate) &&
        isValid("time", paidTime) &&
        paymentSlipPhoto
      ) {
        const formData = new FormData();
        formData.append("year", thisYear);
        formData.append("month", thisMonth);
        formData.append("day", thisDay);
        formData.append("paymentMethod", paymentMethod);
        formData.append("paidBranch", paidBranch);
        formData.append("paidDate", paidDate);
        formData.append("paidTime", paidTime);
        formData.append("paidAmount", paidAmount);
        formData.append("paymentSlip", paymentSlipPhoto);

        await fetch(
          "http://localhost:3001/customer/send/reservation/payment/details",
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              props.onSuccess(true);
            }
          });
      } else {
        displayWarning("Input data is invalid. 😡 Please check and try again.");
      }
    }
  };

  return (
    <>
      <CalenderDateState>Send Payment Details</CalenderDateState>
      {!rejected ? (
        <>
          <ModalCardContainer>
            <div className="customer-payment-details-response__notice">
              Please add valid payment details to get reserved a date within
              <span>{` ${hours} : ${minutes} : ${seconds} `}</span> <br />
              Otherwise your request is rejected...! 🙂
            </div>
            <div className="customer-payment-details__photographer-message-title">
              Photographer Message
            </div>
            <div className="customer-payment-details__photographer-message">
              {props.reservation.message.photographer[0]
                ? props.reservation.message.photographer[0]
                : "No message to preview"}
            </div>
          </ModalCardContainer>
          <div className="customer-payment-details-costs__container">
            <div className="customer-payment-details-costs__title">COSTS</div>
            <div className="customer-payment-details-costs__row">
              <div className="customer-payment-details-costs__name">
                Package {`(${props.reservation.package})`}
              </div>
              <div className="customer-payment-details-costs__price">
                {props.reservation.costs.package} LKR
              </div>
            </div>
            <div className="customer-payment-details-costs__row">
              <div className="customer-payment-details-costs__name">
                Extra Services
              </div>
              <div className="customer-payment-details-costs__price">
                {props.reservation.costs.extraServices} LKR
              </div>
            </div>
            <div className="customer-payment-details-costs__row">
              <div className="customer-payment-details-costs__name">
                Transport
              </div>
              <div className="customer-payment-details-costs__price">
                {props.reservation.costs.transport} LKR
              </div>
            </div>
            <div className="customer-payment-details-costs__row">
              <div className="customer-payment-details-costs__name">
                Estimated Total
              </div>
              <div className="customer-payment-details-costs__price">
                {+props.reservation.costs.transport +
                  +props.reservation.costs.package +
                  +props.reservation.costs.extraServices}{" "}
                LKR
              </div>
            </div>
            <div className="customer-payment-details-costs__row">
              <div className="customer-payment-details-costs__name">
                Advance Payment
              </div>
              <div className="customer-payment-details-costs__price">
                {props.reservation.costs.advance} LKR
              </div>
            </div>
            <div className="customer-payment-details__bank-details">
              <div>Please pay advance payment to,</div>
              <div>
                <span>Bank: </span>
                {photographer.bankName}
              </div>
              <div>
                <span>Account No: </span>
                {photographer.bankAccountNo}
              </div>
            </div>
          </div>
          <div className="customer-payment-details-payment__container">
            <div className="customer-payment-details-payment__title">
              PAYMENT DETAILS
            </div>
            <div className="customer-payment-details-payment__method-notice">
              Select Your Payment Method
            </div>
            <div className="customer-payment-details-payment-method__container">
              <div
                className={
                  paymentMethod === "bank" ? "selected-payment-method" : null
                }
                onClick={onClickByBankHandler}
              >
                By Bank
              </div>
              <div
                className={
                  paymentMethod === "online banking"
                    ? "selected-payment-method"
                    : null
                }
                onClick={onClickByOnlineBankingHandler}
              >
                By Online Banking
              </div>
            </div>
            <div>
              {paymentMethod === "bank" ? (
                <FormInput
                  value={paidBranch}
                  onChange={onChangePaidBranch}
                  placeholder="Example: POLGAHAWELA"
                >
                  Paid Bank Branch:
                </FormInput>
              ) : null}
              <FormInput
                value={paidAmount}
                onChange={onChangePaidAmount}
                placeholder="Example: 10,000.00"
              >
                Paid Amount:
              </FormInput>
              <FormInput
                value={paidDate}
                onChange={onChangePaidDate}
                placeholder="DD / MM / YYYY"
              >
                Paid Date:
              </FormInput>
              <FormInput
                value={paidTime}
                onChange={onChangePaidTime}
                placeholder="HH:MM"
              >
                Paid Time:
              </FormInput>
              <div className="customer-payment-details-screenshot__notice">
                {screenshotNotice}
                <div className="customer-payment-details-screenshot-upload__container">
                  <label
                    className={
                      "customer-payment-details-screenshot__upload " +
                      uploadBtnStyles
                    }
                  >
                    <UploadSVG />
                    <input
                      name="paymentSlip"
                      onChange={onChangePaymentSlipHandler}
                      type="file"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <div className="custmer-payment-details-action__container">
            <button
              onClick={onClickRejectHandler}
              className="customer-payment-details-action__reject"
            >
              Reject
            </button>
            <button
              onClick={onClickSendPaymentDetailsHandler}
              className="customer-payment-details-action__send"
            >
              Send
            </button>
          </div>
        </>
      ) : null}
      {rejected ? (
        <>
          <div className="customer-payment-details-reject-warning__container">
            <h2>WARNING...! ⚠</h2>
            <div>
              Please make sure that you cannot recover once you reject a
              reservation. Do you really want to reject? 🙄
            </div>
          </div>
          <div className={"warning-msg__container " + warningStyles}>
            {warningMessage}
          </div>
          <div>
            <div className="custmer-payment-details-action__container">
              <button
                onClick={onClickRejectYesHandler}
                className="customer-payment-details-action__reject"
              >
                Yes
              </button>
              <button
                onClick={onClickRejectNoHandler}
                className="customer-payment-details-action__send"
              >
                No
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CustomerPaymentDetails;
