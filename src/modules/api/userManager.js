const url = "http://localhost:8000"

export default {
  register(userToPost) {
    return fetch(`${url}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userToPost)
    }).then(result => result.json());
  }
}