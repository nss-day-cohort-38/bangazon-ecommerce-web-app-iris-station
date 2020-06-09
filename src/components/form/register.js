import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { UserForm } from "./index";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Iris Station</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    position: "relative",
    zIndex: "3",
    backgroundColor: "#ffffff"
  },
  paper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  let formData = {};
  if (props.formData) {
    formData = props.formData;
  }
  const classes = useStyles();
  // const  = props.failedLogin;
  // const  = props.handleFieldChange;
  // const handleSubmit = props.handleSubmit;
  const {
    handleSubmit,
    handleFieldChange,
    failedLogin,
    failedLoginMessage,
  } = props;

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/logosmall.png`} />
        </Link>

        <Typography component="h1" variant="h5">
          Create your account
        </Typography>
        <UserForm
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          failedLoginMessage={failedLoginMessage}
          failedLogin={failedLogin}
          classes={classes}
          formData={formData}
        />
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
    </Container>
  );
};

export default SignUp;
