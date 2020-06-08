import baseurl from "./baseurl";


const paymentDataManager = {
  addPayment(token, paymentObj) {
    return fetch(`${baseurl}/payment_types`, {
      method: "POST",
      body: JSON.stringify(paymentObj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
  },
  delete(token, paymentId) {
    return fetch(`${baseurl}/payment_types/${paymentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
  },
  getAll(token) {
    return fetch(`${baseurl}/payment_types`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((resp) => resp.json());
  },
};

export default paymentDataManager;
