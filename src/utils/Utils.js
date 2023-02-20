/** This class contains the utility functions need to perform neccessary tasks */

export const toFormData = async (object) => {
  let formData = new FormData();

  if (object) {
    const keys = Object.keys(object);
    let image;

    for (let key of keys) {
      if (key === "profilePicture") {
        image = key;
        continue;
      }
      formData.append(key, object[key]);
    }
    formData.append(image, object[image]);
    return formData;
  } else {
    return null;
  }
};