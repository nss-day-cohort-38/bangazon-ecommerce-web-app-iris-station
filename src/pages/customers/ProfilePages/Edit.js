import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import {UserForm} from "../../../components/form"
import userManager from "../../../modules/api/userManager" 

const EditProfile = props => {
  const userData = props.userData;
  const [formData, setFormData] = useState(
    {
      username: "", 
      email: "",
      // Password updating has been tabled;
      // it will require password hashing...
      // password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: ""
    }
  )

  const setUserToEdit = () => {
    const user = userData.user;
    const customer = userData;
    setFormData(
      {
        username: `${user.username}`,
        // Password updating has been tabled;
        // it will require password hashing...
        // password: `${user.password}`, 
        email: `${user.email}`,
        firstName: `${user.first_name}`,
        lastName: `${user.last_name}`,
        address: `${customer.address}`,
        phoneNumber: `${customer.phone_number}`
      }
    )
  }

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
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName
    }

    const customer = {
      address: formData.address,
      phone_number: formData.phoneNumber
    }

    // Note: User and Customer updated seperately
    userManager.updateUser(token, userData.user_id, user)
      .then(resp => {
        if (resp.status === 204) {
          userManager.updateCustomer(token, userData.id, customer)
            .then(resp => {
              if (resp.status === 204) {
                // Forcing a get of the new data
                props.getUserData()
                props.setProfileView("view")
              }
            })
        }
      })
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
    setUserToEdit()
  }, [failedLogin, userData])

  return (
    <>
      <UserForm
        classes={useStyles()}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        failedLogin={failedLogin}
        formData={formData}
      />
    </>
  )
}
export default EditProfile