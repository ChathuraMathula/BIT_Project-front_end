import Sanitizer from "./Sanitizer";

// This Validator Class contains functions need to validate user inputs

class Validator {
  static #isMatched(str, pattern) {
    /* 
        This function takes string value and a regEx pattern.
        Then checks whether the string is empty or not, if not, it returns
        true if the string matches the pattern or otherwise returns false
    */

    if ((!this.isEmpty(str))) {
      str = Sanitizer.sanitize(str);
      return pattern.test(str);
    }
    return false;
  }

  static isEmpty(str) {
    if (typeof str === "string") {
      str = str.trim();
      if (str === "") {
        return true; // return string if the string is not empty
      }
    }
    return false; // otherwise false
  }

  static isValid(type, value) {
    let pattern = / /;

    switch (type) {
      case "username":
        pattern = /^[a-z0-9]+$/i; // username eg: janakran12
        break;
      case "password":
        // password pattern eg: Mypass@#$!123
        pattern = /^[a-z0-9\!\(\)\-\.\?\[\]\_\`\~\;\:\@\#\$\%\&\*\+\=\^]+$/i;
        break;
      case "name":
        // name pattern eg: Janaka/Ranasinghe
        pattern = /^[a-z]+$/i;
        break;
      case "phoneNo":
        // phone_no pattern eg: 0701234567
        pattern = /^\d{10}$/; // matches exactly 10 digits
        break;
      case "email":
        value = value.toLowerCase(); // converts to a lower case string
        // email pattern eg: example@gmail.com
        pattern = /^[a-z0-9\.\-\_]+[a-z0-9]+\@[a-z0-9\-]+\.[a-z]{2,}$/;
        break;
      case "address":
        // address pattern eg: No 35, Colombo Rd, Polgahawela.
        pattern = /^[a-z0-9\.\,\ ]+$/i;
        break;
      case "url_path":
        // url path pattern eg: /profile/photo
        pattern = /\/[a-z0-9\.]+$/i;
        break;
    }

    // return true if the value is matched to the pattern, otherwise return false
    return Validator.#isMatched(value, pattern);
  }
}

export default Validator;
