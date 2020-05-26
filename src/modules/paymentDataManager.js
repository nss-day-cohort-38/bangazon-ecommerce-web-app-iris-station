import baseurl from "./baseurl";

const paymentDataManager = {
  addPayment(token, paymentObj) {
    fetch(`${baseurl}/payment_types`, {
      method: "POST",
      body: JSON.stringify(paymentObj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
  },
};

export default paymentDataManager;
