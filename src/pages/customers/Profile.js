import React, { useEffect, useState } from "react";
import { VerticalMenu } from "../../components";
import { AddPaymentPage, OrderHistory } from "./index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const ProfilePage = ({ match }) => {
  const [profileView, setProfileView] = useState("");
  const [itemId, setItemId] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (match.params.category) {
      setProfileView(match.params.category);
    } else if (profileView) {
      setProfileView("");
    }

    if (match.params.itemId) {
      setItemId(match.params.itemId);
    } else if (itemId) {
      setItemId("");
    }
  }, [match]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid xs={4} item md={2}>
          <VerticalMenu
            menuData={[
              { title: "Order History", route: "/profile/order-history" },
              { title: "Add Payment Option", route: "/profile/add-payment" },
            ]}
            firstActive={profileView}
          />
        </Grid>
        <Grid item xs={8} md={9}>
          {profileView === "add-payment" && <AddPaymentPage />}
          {profileView === "order-history" && <OrderHistory itemId={itemId} />}
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
