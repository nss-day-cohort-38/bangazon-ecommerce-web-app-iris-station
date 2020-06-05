import baseurl from "./baseurl";

export default {
  getHomeList() {
    return fetch(`${baseurl}/products?number`).then((r) => r.json());
  },
  getAllProducts() {
    return fetch(`${baseurl}/products`).then((r) => r.json());
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
  postProduct(token, obj) {
    // Note: Content-type cannot be set when uploading a file
    const headers = {
      Authorization: `Token ${token}`,
    }
    // If there is no image, 
    // then content-type and accept are needed in the fetch call
    if (obj.image_path === null) { 
      headers["Accept"] = "application/json";
      headers["Content-Type"] = "application/json";
    } 
    
    return fetch(`${baseurl}/products`, {
      method: "POST",
      headers: headers,
      body: obj
    }).then((response) => response.json())
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
  getProductTypes() {
    return fetch(`${baseurl}/producttypes`)
      .then((result) => result.json())
  }
};
