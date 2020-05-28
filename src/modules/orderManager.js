import baseurl from "./baseurl";
import { productManager } from "./index";
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
  },
  getOrderPrice(token, orderId) {
    return fetch(`${baseurl}/order_products?order_id=${orderId}`, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((r) => r.json())
      .then((resp) => {
        let promiseArray = resp.map((item) => {
          return productManager.getOneProduct(item.product_id).then(resp);
        });
        return Promise.all(promiseArray).then((item) => {
          return item.map((product, i) => {
            return { ...product, relId: resp[i].id };
          });
        });
      });
  },
};
