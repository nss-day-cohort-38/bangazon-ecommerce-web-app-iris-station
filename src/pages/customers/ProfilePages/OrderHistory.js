import React, { useState, createRef } from "react";
import { Paper, PaymentForm } from "../../../components";
import { PaymentDataManager } from "../../../modules";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Sticky, Ref, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../../styles/OrderHistory.css";

const OrderHistory = ({ itemId }) => {
  const classes = useStyles();
  const contextRef = createRef();
  // Order History needs to be stored in state as an array
  const [orderHistory, setOrderHistory] = useState(Array(30).fill({ id: 1 }));
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
                <div>Pictures of order items</div>
                <Link to={`/profile/order-history/${item.id}`}>Details</Link>
              </Paper>
            );
          })}
        </Grid>
        {itemId && (
          <Grid item xs={4}>
            <Paper classProps="order-details-column">
              <div className="paper-header">
                <div>Order Placed</div>
                <div>
                  <Link to="/profile/order-history">
                    <Icon name="x" />
                  </Link>
                </div>
              </div>
              <div>Price:</div>
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
