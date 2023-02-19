/** This class contains the utility functions need to perform neccessary tasks */

export const toFormData = async (object) => {
  let formData = new FormData();

  if (object) {
    const keys = Object.keys(object);

    for (let key of keys) {
      formData.append(key, object[key]);
    }
    return formData;
  } else {
    return null;
  }
};