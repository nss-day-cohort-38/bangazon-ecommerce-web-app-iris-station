import React, { useState, createRef } from "react";
import { Paper, PaymentForm } from "../../../components";
import { PaymentDataManager } from "../../../modules";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Sticky, Ref } from "semantic-ui-react";
import "../../../styles/OrderHistory.css";
const OrderHistory = ({ itemId }) => {
  const classes = useStyles();
  const contextRef = createRef();
  // Order History needs to be stored in state as an array
  const [orderHistory, setOrderHistory] = useState(
    Array(30).fill(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium purus quis odio venenatis, eget gravida dolor consequat. Donec ut leo semper, porttitor neque non, ornare dolor. Sed volutpat, libero sit amet cursus tristique, tortor risus commodo sem, a placerat magna nibh ut risus. Cras interdum dolor a leo pellentesque facilisis. In hac habitasse platea dictumst. Morbi sodales, leo at ornare rutrum, sapien leo hendrerit dui, sit amet rutrum nisl magna at nisl. Nunc posuere at nunc ac dapibus. Nam non augue eu dolor feugiat rutrum. Donec justo augue, posuere pellentesque nunc ultrices, mattis tincidunt tellus. Morbi interdum tellus sapien, at facilisis augue lobortis tristique. Nam lacinia lorem nisl, non suscipit enim lacinia vitae. Etiam eu sollicitudin augue, tristique blandit purus. Praesent ornare dui vitae"
    )
  );
  // Set Loading in state
  const [loading, setLoading] = useState(false);
  //   State to hold what order the user is looking at
  const [activeOrder, setActiveOrder] = useState([]);

  useState(() => {
    //   Start Loading
    setLoading(true);
    //   Get Order History from database

    // Push to orderHistory state

    // End Loading
  }, []);

  return (
    //   Add loaging if loading

    // Map over Order History and put them in paper
    //
    <div className={classes.root}>
      {/* // Add grid to seperate this into two parts. */}
      <h1>Your Orders</h1>
      <Grid container spacing={0}>
        <Grid item xs={itemId ? 8 : 12}>
          {orderHistory.map((item) => {
            return (
              <Paper>
                <div>Order Placed:</div>
                <div>Price:</div>
                <div>Details:</div>
              </Paper>
            );
          })}
        </Grid>
        {itemId && (
          <Grid item xs={4}>
            <Paper classProps="order-details-column">
              <div>Order Placed:</div>
              <div>Price:</div>
              <div>Details:</div>
              <div>Products:</div>
              zxczxcz

            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default OrderHistory;

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
