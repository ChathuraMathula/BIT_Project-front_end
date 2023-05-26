import { sanitize } from "./sanitize";
import { isValid } from "./validator";

export const postLogin = async (userData) => {
  const formData = new FormData();
  const username = sanitize(userData.username);
  const password = sanitize(userData.password)

  if (
    isValid("username", username) &&
    isValid("password", password)
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
