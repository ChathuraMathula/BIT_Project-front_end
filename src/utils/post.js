import Sanitizer from "./Sanitizer";
import Validator from "./Validator";

export const postLogin = async (userData) => {
  const formData = new FormData();
  console.log("inside post.js => " ,userData);
  const username = Sanitizer.sanitize(userData.username);
  const password = Sanitizer.sanitize(userData.password);

  if (
    Validator.isValid("username", username) &&
    Validator.isValid("password", password)
  ) {

    formData.append("username", username);
    formData.append("password", password);
    const url = "http://localhost:3001/login";
    const options = {
      method: "POST",
      body: formData,
      credentials: "include",
    };

    return await fetch(url, options);
  } else {
    return Promise.reject("invalidData");
  }
};
