import Fetcher from "./Fetcher";
import Sanitizer, { sanitize } from "./Sanitizer";

/**
 * 
 * @param {string} str string of value to be matched against pattern
 * @param {RegExp} pattern RegEx pattern to be matched
 * @returns true if str is matched to pattern, else false.
 */
const isMatched = (str, pattern) => {
  if (str !== "") {
    str = sanitize(str);
    return pattern.test(str);
  }
  return false;
};

/**
 * 
 * @param {string} str string to be validate
 * @returns true if the string is empty, else false.
 */
export const isEmpty = (str) => {
  if (typeof str === "string") {
    str = str.trim();
    if (str === "") {
      return true; 
    }
  }
  return false; 
};

/**
 * 
 * @param {string} type type of the string passed ( username | password | name | phoneNo | email | address | url_path )
 * @param {string} value string to be validated against type
 * @returns returns true if the value is of specified type, else false.
 */
export const isValid = (type, value) => {
  let pattern = /./;

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
    default:
      pattern = /./;
      break;
  }

  // return true if the value is matched to the pattern, otherwise return false
  return isMatched(value, pattern);
};

/**
* 
* @param {object} imageFile 
* @returns true if image if of mime type "image/png" or "image/jpeg"
*/
export const isValidImageFile = (imageFile) => {
 if (imageFile) {
   // match /image/png or /image/jpeg pattern
   return /^image\/(png|jpeg)$/.test(imageFile.type);
 } else {
   return false;
 }
};



// This Validator Class contains functions need to validate user inputs
class Validator {
  static #isMatched(str, pattern) {
    /* 
        This function takes string value and a regEx pattern.
        Then checks whether the string is empty or not, if not, it returns
        true if the string matches the pattern or otherwise returns false
    */

    if (!this.isEmpty(str)) {
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
    let pattern = /./;

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
      default:
        pattern = /./;
        break;
    }

    // return true if the value is matched to the pattern, otherwise return false
    return Validator.#isMatched(value, pattern);
  }

  // Checks whether the both passwords are same
  static isPasswordConfirmed(password, confirmedPassword) {
    if (password && confirmedPassword) {
      return password === confirmedPassword;
    }
    return false;
  }

  // Checks whether the object is empty
  static isEmptyObject(obj) {
    if (obj) {
      return Object.keys(obj).length === 0;
    } else {
      return true;
    }
  }

  // This function takes an object checks if the requiredFieldArray attributes is not empty
  static isRequiredFieldsEmpty(obj, requiredFieldsArray) {
    for (let field of requiredFieldsArray) {
      if (!obj[field]) {
        return true;
      }
    }
    return false;
  }

  /**
   * 
   * @param {object} imageFile 
   * @returns true if image if of mime type "image/png" or "image/jpeg"
   */
  static isValidImageFile(imageFile) {
    if (imageFile) {
      // match /image/png or /image/jpeg pattern
      return /^image\/(png|jpeg)$/.test(imageFile.type);
    } else {
      return false;
    }
  }


  /**
   * 
   * @param {object} imageFile 
   * @param {number} size defult 2000000 = 2MB
   * @returns true if image file less than the size
   */
  static isImageSizeLessThan(imageFile, size = 2000000) {
    if (!imageFile) return false;

    if (imageFile.size <= size) {
      return true;
    } else {
      return false;
    }
  }


  /* ------------------------------------------------------------------------------- */
  /* ---------- These Functions use fetch API to get data from backend ------------- */
  /* ------------------------------------------------------------------------------- */

  // checks whether the username is already existing in the database
  static async isExistingUser(username) {
    let isExisting;
    await Fetcher.getUsers().then((users) => {
      if (users) {
        isExisting = users.some((user) => user["username"] === username);
      }
    });
    return isExisting;
  }

  // Get the photographer document from the /users API
  static async getPhotographer() {
    let result;
    const users = await Fetcher.getUsers();
    users.then((user) => {
      for (let user of users) {
        if (user.role === "photographer") {
          result = user;
        }
      }
    });

    return result;
  }
}

export default Validator;
