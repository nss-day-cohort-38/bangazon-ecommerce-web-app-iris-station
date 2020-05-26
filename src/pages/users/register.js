import React, { useState } from "react";
import {RegisterForm} from "../../components/form/index"

const Register = () => {
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

    ApiManager.post("register", user)
      .then(resp => {
        if("token" in resp) {
          props.setUser(resp)
        }
        props.history.push("/");
      })
  }

  return (
    <>
      <RegisterForm />
    </>
  )
}

export default Register