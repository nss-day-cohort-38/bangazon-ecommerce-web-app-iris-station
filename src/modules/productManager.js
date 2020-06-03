// import baseurl from "./baseurl";
const baseurl = "http://localhost:8000"

export default {
  getHomeList() {
    return fetch(`${baseurl}/products?number`).then((r) => r.json());
  },
  getOneProduct(id) {
    return fetch(`${baseurl}/products/${id}`).then((r) => r.json());
  },
  getProductByUser() {
    return fetch(`${baseurl}/products?user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
    }).then((r) => r.json());
  },
  deleteProduct(id) {
    return fetch(`${baseurl}/products/${id}`, {
      method: "DELETE",
    });
  },
  updateQuantity(token, obj) {
    return fetch(`${baseurl}/products/${obj.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(obj),
    });
  },
  async getProductTypes() {
    const r = await fetch(`${baseurl}/producttypes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
    });
    return await r.json();
  },

  async getProductsByProductType(productTypeId) {
    const r = await fetch(`${baseurl}/products?productTypeId=${productTypeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
    });
    return await r.json();
  },

  async getProductTypeById(id) {
    const r = await fetch(`${baseurl}/producttypes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
    });
    return await r.json();
  },
};
