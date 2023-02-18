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
}

export default Fetcher;
