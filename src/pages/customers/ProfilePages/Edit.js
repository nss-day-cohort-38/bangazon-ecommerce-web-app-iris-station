import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import {UserForm} from "../../../components/form"
import userManager from "../../../modules/api/userManager" 

const EditProfile = props => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = window.sessionStorage.getItem("token");

    const user = {
      "username": formData.username,
      "email": formData.email,
      "password": formData.password,
      "first_name": formData.firstName,
      "last_name": formData.lastName
    }

    const customer = {
      "address": formData.address,
      "phone_number": formData.phoneNumber
    }

    // TODO: UPDATE NOT REGISTER
    userManager.updateUser(token, user)
      .then(resp => {
        if ("token" in resp) {
            props.setUserToken(resp)
            props.history.push("/");
        }
      })
      // With a 500 HTTP error, no response is given,
      // so the error must be handled with .catch
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
      .catch( () => setFailedLogin(true) )
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  useEffect( () => {

  }, [failedLogin])

  return (
    <>
      <UserForm
        classes={useStyles()}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        failedLogin={failedLogin}
      />
    </>
  )
}
export default EditProfile