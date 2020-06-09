import React, { useEffect, useState } from "react";
import { VerticalMenu } from "../../components";
import { AddPaymentPage, OrderHistory, PaymentPage, View, Edit } from "./index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { userManager } from "../../modules";

const ProfilePage = ({ match }) => {
  const [profileView, setProfileView] = useState("");
  const [userData, setUserData] = useState({});
  const classes = useStyles();
  const [itemId, setItemId] = useState("");

  const getUserData = () => {
    const token = window.sessionStorage.getItem("token");
    userManager.getCustomer(token).then((resp) => {
      setUserData(resp);
    });
  };

  useEffect(() => {
    if (match.params.category) {
      setProfileView(match.params.category);
    } else if (profileView) {
      setProfileView("");
    }
    getUserData();
    if (match.params.itemId) {
      setItemId(match.params.itemId);
    } else if (itemId) {
      setItemId("");
    }
  }, [match]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {/* 
            Edit Profile doesn't appear in the menu, 
            because it is accessed from an edit button on /profile/view,
            not the menu itself
          */}
          <VerticalMenu
            menuData={[
              { title: "Account", route: "/profile/view" },
              { title: "Order History", route: "/profile/order-history" },
              { title: "Payment Types", route: "/profile/payment-types" },
              { title: "Add Payment Option", route: "/profile/add-payment" },
            ]}
            firstActive={profileView}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {profileView === "view" && (
            <View userData={userData} setProfileView={setProfileView} />
          )}
          {profileView === "edit" && (
            <Edit
              userData={userData}
              setProfileView={setProfileView}
              getUserData={getUserData}
            />
          )}
          {profileView === "add-payment" && <AddPaymentPage />}
          {profileView === "order-history" && <OrderHistory itemId={itemId} />}
          {profileView === "payment-types" && <PaymentPage />}
        </Grid>
        <Grid item xs={false} md={1}></Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

//   const classes = useStyles();

// }
