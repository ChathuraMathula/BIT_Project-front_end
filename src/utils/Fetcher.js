// This class contains all the data fetching and posting methods

class Fetcher {
  // getCustomers() returns an array of customer documents
  static async getUsers() {
    const url = "http://localhost:3001/users";
    let users;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        users = data;
      })
      .catch((error) => {
        if (error) {
          users = [];
        }
      });

    return users;
  }

  /** --------------------------------------------------------------------------------------------
   * postUser()
   * post a userdocument to the backend
   * 
   ----------------------------------------------------------------------------------------------*/
  static async postUser(userData) {
    const url = "http://localhost:3001/users";
    const options = {
      method: "POST",
      body: userData,
    };

    return await fetch(url, options);
  }
  /** ------------------------------ END postUser() --------------------------------------------- */

  /** --------------------------------------------------------------------------------------------
   * postProfilePhoto()
   * post a userdocument to the backend
   * 
   ----------------------------------------------------------------------------------------------*/
  static async postProfilePhoto(imageFile) {
    const url = "http://localhost:3001/users/profile/photo";
    const options = {
      method: "POST",

      // Adding body or contents to send
      body: imageFile,

      // Adding headers to the request
      headers: {
        "Content-type": imageFile.type, // image/png or image/jpeg
      },
    };

    let responseObj;

    await fetch(url, options)
      .then((res = res.json()))
      .then((jsonObj) => (responseObj = jsonObj));

    return responseObj;
  }
  /** -------------------------------------------------------------------------------------------- */
}

export default Fetcher;
