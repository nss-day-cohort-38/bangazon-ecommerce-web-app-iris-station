import baseurl from "./baseurl";
export default {
  getOrders(token) {
    return fetch(`${baseurl}/orders`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((r) => r.json());
  },
  postOrder(token) {
    return fetch(`${baseurl}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((r) => r.json());
  }
};
