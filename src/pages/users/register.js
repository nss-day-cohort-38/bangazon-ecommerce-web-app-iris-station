import React, { useEffect, useState } from "react";
import {RegisterForm} from "../../components/form/index"
import {userManager} from "../../modules/index"

const Register = props => {
  const [formData, setFormData] = useState(
    {
      username: "", 
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: ""
    }
  )
  const [failedLogin, setFailedLogin] = useState(false)

  const handleFieldChange = (evt) => {
    const stateToChange = { ...formData };
    stateToChange[evt.target.id] = evt.target.value;
    setFormData(stateToChange);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      "username": formData.username,
      "email": formData.email,
      "password": formData.password,
      "first_name": formData.firstName,
      "last_name": formData.lastName,
      "address": formData.address,
      "phone_number": formData.phoneNumber
    }

    userManager.register(user)
      .then(resp => {
        if ("token" in resp) {
            props.setUserInfo(resp)
            props.history.push("/");
        }
      })
      // With a 500 HTTP error, no response is given,
      // so the error must be handled with .catch
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
      .catch( () => setFailedLogin(true) )
  }

  useEffect( () => {

  }, [failedLogin])

  return (
    <>
      <form onSubmit={handleRegister}>
        <RegisterForm 
          handleFieldChange={handleFieldChange}
          failedLogin={failedLogin}
        />
      </form>
    </>
  )
}

export default Register