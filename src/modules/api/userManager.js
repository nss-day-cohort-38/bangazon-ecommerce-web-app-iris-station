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
  getCustomer(token) {
    return fetch(`${baseurl}/customers`, {
      method: "GET",
      headers: {
          'content-type': "application/json",
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
      }
    }
    )
      .then(result => result.json())
  }
}