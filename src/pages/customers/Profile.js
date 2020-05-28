import React, { useEffect, useState } from "react";
import { VerticalMenu } from "../../components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {userManager} from '../../modules';
import { AddPaymentPage, View, Edit } from "./index";


// FIXME: This component currently gets wonky when the normal navbar is used while user is in this component
const ProfilePage = ({ match }) => {
  const [profileView, setProfileView] = useState("");
  const [userData, setUserData] = useState({});
  const classes = useStyles();
  
  const getUserData = () => {
    const token = window.sessionStorage.getItem("token");
    userManager.getCustomer(token)
      .then(resp => {
        setUserData(resp)
      })
  }

  useEffect(() => {
    if (match.params.category) {
      setProfileView(match.params.category);
    } else if (profileView) {
      setProfileView("");
    }
    getUserData();
  }, [match]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          {/* 
            Edit Profile doesn't appear in the menu, 
            because it is accessed from an edit button on /profile/view,
            not the menu itself
          */}
          <VerticalMenu
            menuData={[
              { title: "Profile View", route: "/profile/view"},
              { title: "Add Payment Option", route: "/profile/add-payment" }
            ]}
          />
        </Grid>
        <Grid item xs={9}>
          {profileView === "view" && <View userData={userData} setProfileView={setProfileView}/>}
          {profileView === "edit" && <Edit userData={userData}/>}
          {profileView === "add-payment" && <AddPaymentPage />}
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfilePage;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

//   const classes = useStyles();

// }
