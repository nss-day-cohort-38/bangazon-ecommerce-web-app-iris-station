import React, { useState, useEffect } from "react";
import {LoginForm} from "../../components/form/index"
import {userManager} from "../../modules/index"

const Login = props => {
  const [formData, setFormData] = useState(
    {
      username: "", 
      password: ""
    }
  )
  const [failedLogin, setFailedLogin] = useState(false)

  const handleFieldChange = (evt) => {
    const stateToChange = { ...formData };
    stateToChange[evt.target.id] = evt.target.value;
    setFormData(stateToChange);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      "username": formData.username,
      "password": formData.password
    }

    userManager.login(user)
      .then(resp => {
        if("token" in resp) {
          props.setUserToken(resp)
          props.history.push("/")
        }
        // If there is no token, 
        // the login was unsuccessful,
        // and so an error message is displayed 
        else {
          setFailedLogin(true)
        }
      })
  }

  useEffect( () => {

  }, [failedLogin])

  return (
    <>
      <form onSubmit={handleLogin}>
        <LoginForm 
          handleFieldChange={handleFieldChange}
          failedLogin={failedLogin}
        />
      </form>
    </>
  )
}

export default Login