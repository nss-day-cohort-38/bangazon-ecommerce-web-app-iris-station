import baseurl from "../baseurl";

export default {
  register(userToPost) {
    return fetch(`${baseurl}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToPost),
    }).then((result) => result.json());
  },
  login(userToLogin) {
    return fetch(`${baseurl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    }).then((result) => result.json());
  },
  getCustomer(token) {
    return fetch(`${baseurl}/customers`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((result) => result.json());
  },
  updateCustomer(token, customerId, updatedCustomer) {
    return fetch(`${baseurl}/customers/${customerId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updatedCustomer),
    });
  },
  updateUser(token, userId, updatedUser) {
    return fetch(`${baseurl}/users/${userId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });
  },
  getUser(tokenObj) {
    return fetch(`${baseurl}/get_user/`, {
      method: "POST",
      body: JSON.stringify(tokenObj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((resp) => resp.json());
  },
  customerMultipleOpen() {
    return fetch(`${baseurl}/customers?multiple_open`).then((resp) =>
      resp.json()
    );
  },
};
