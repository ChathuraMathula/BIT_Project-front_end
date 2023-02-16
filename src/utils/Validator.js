import Sanitizer from "./Sanitizer";

// This Validator Class contains functions need to validate user inputs

class Validator {

   static #isValidString(inputString, pattern) {
    /* 
        This function takes string value and a regEx pattern.
        Then checks whether the string is empty or not, if not, it returns
        true if the string matches the pattern or otherwise returns false
    */

    if ((inputString = this.isNotEmpty(str))) {
      inputString = Sanitizer.sanitize(str);
      return pattern.test(inputString);
    }
    return false;
  }

  static isNotEmpty(str) {
    str = str.toString();
    if (typeof str === "string" && str.trim().length !== 0) {
      return str; // return string if the string is not empty
    }
    return false; // otherwise false
  }

  static isValidUsername(str) {
    const pattern = /^[a-z0-9]+$/i; // username eg: janakran12

    return Validator.#isValidString(str, pattern); // returns true if username is valid
  }

  static isValidPassword(str) {
    const pattern = /^[a-z0-9\!\(\)\-\.\?\[\]\_\`\~\;\:\@\#\$\%\&\*\+\=\^]+$/i;
    // password pattern eg: Mypass@#$!123`

    return Validator.#isValidString(str, pattern); // returns true if password is valid
  }

  static isValidName(str) {
    const pattern = /^[a-z]+$/i;
    // name pattern eg: Janaka/Ranasinghe
    
    return Validator.#isValidString(str, pattern); // returns true if name is valid
  }

  static isValidPhoneNo(str) {
    const pattern = /^\d{10}$/; // matches exactly 10 digits
    // phone_no pattern eg: 0701234567
    
    return Validator.#isValidString(str, pattern); // returns true if phone number is valid
  }
}

export default Validator;
