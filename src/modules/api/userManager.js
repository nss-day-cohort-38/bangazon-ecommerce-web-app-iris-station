import baseurl from '../baseurl'

export default {
  register(userToPost) {
    return fetch(`${baseurl}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userToPost)
    }).then(result => result.json());
  },
  login(userToLogin) {
    return fetch(`${baseurl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userToLogin)
    }).then(result => result.json());
  },
  // FIXME: use token?
  getCustomer(customerId) {
    return fetch(`${baseurl}/customers/${customerId}`)
      .then(result => result.json())
  },
  // FIXME: use token?
  getUser(userId) {
    return fetch(`${baseurl}/users/${userId}`)
      .then(result => result.json())
  }
}