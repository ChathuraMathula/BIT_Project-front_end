// This class contains all the data fetching and posting methods

class Fetcher {
  // getCustomers() returns an array of customer documents
  static async getCustomers() {
    const url = "http://localhost:3001/users/customers";
    let customers;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        customers = data;
      })
      .catch((error) => {
        if (error) {
          customers = [];
        }
      });

    return customers;
  }
}

export default Fetcher;
