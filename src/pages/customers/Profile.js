import React, { useEffect, useState } from "react";
import { VerticalMenu } from "../../components";
import { AddPaymentPage } from "./index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const ProfilePage = ({ match }) => {
  const [profileView, setProfileView] = useState("");
  const classes = useStyles();
  useEffect(() => {
    if (match.params.category) {
      setProfileView(match.params.category);
    } else if (profileView) {
      setProfileView("");
    }
  }, [match]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <VerticalMenu
            menuData={[
              { title: "Order History", route: "/profile/order-history" },
              { title: "Add Payment Option", route: "/profile/add-payment" },
            ]}
          />
        </Grid>
        <Grid item xs={9}>
          {profileView === "add-payment" && <AddPaymentPage />}
        </Grid>
      </Grid>
    </div>
  );
};

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
