import React from "react";
import { Message } from "semantic-ui-react"; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const UserForm = props => {
  let isEdit = false
  if (Object.keys(props.formData).length !== 0) {
    isEdit = true
  }
  const classes = props.classes;
  const handleFieldChange = props.handleFieldChange;
  const handleSubmit = props.handleSubmit;

  return (
    <>
      <form 
        className={classes.form} 
        onSubmit={handleSubmit}
        autocomplete="on"
      >
        <Grid container spacing={2}>
          {/* For now, this is the most common error we will be facing */}
          {props.failedLogin 
            ? <Message negative>
                <p>{props.failedLoginMessage}</p>
              </Message>
            : <></> 
          }
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={handleFieldChange}
              value={isEdit ? props.formData.firstName : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={handleFieldChange}
              value={isEdit ? props.formData.lastName : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={handleFieldChange}
              value={isEdit ? props.formData.username : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleFieldChange}
              value={isEdit ? props.formData.email : null}
            />
          </Grid>
          {isEdit 
            ? <></> 
            : <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleFieldChange}
                  />
                </Grid>
              </>
          }
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="address"
              label="Address"
              id="address"
              autoComplete="address"
              onChange={handleFieldChange}
              value={isEdit ? props.formData.address : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              id="phoneNumber"
              autoComplete="phoneNumber"
              onChange={handleFieldChange}
              value={isEdit ? props.formData.phoneNumber : null}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid> */}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </>
  ) 
}

export default UserForm