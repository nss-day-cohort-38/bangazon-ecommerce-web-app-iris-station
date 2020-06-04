import React, { useState, createRef, useEffect } from "react";
import { Paper, Expansion } from "../../../components";
import { OrderDetails } from "./index";
import { orderManager, orderProductManager } from "../../../modules";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../../styles/OrderHistory.css";

const OrderHistory = ({ itemId }) => {
  const classes = useStyles();
  const contextRef = createRef();
  // Order History needs to be stored in state as an array
  const [orderHistory, setOrderHistory] = useState([]);
  // Set Loading in state
  const [listLoading, setListLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  //   State to hold what order the user is looking at
  const [currentOrder, setCurrentOrder] = useState({
    price: "",
    products: [],
    orderinfo: {},
  });

  useEffect(() => {
    //   Start Loading
    setListLoading(true);
    //   Get Order History from database
    orderManager
      .getOrders(window.sessionStorage.getItem("token"))
      .then((resp) => {
        setOrderHistory(
          // Removes active orders
          resp.filter((item) => (item.payment_type_id ? true : false))
        );
        // Stops loading
        setListLoading(false);
      });
  }, []);

  useEffect(() => {
    // Checks to see if there is an Itemid passed down and that that order history has been fetched
    if (itemId && orderHistory.length > 0) {
      // Starts loading for details view
      setDetailsLoading(true);

      // Get's the token from session storage
      let token = window.sessionStorage.getItem("token");

      // Gets all the products for the order
      orderProductManager.getProductsbyOrder(token, itemId).then((resp) => {
        setCurrentOrder((prevState) => {
          // Object to hold new state
          let newObj = { ...prevState };

          // Starting state of products
          newObj.products = {};

          // Combines duplicate prpducts in newObj.products
          resp.map((item) => {
            if (newObj.products[item.product.id]) {
              newObj.products[item.product.id].instances.push(item.id);
            } else {
              newObj.products[item.product.id] = {
                ...item.product,
                instances: [item.id],
              };
            }
          });

          // Combines the proces of all products to get total price
          newObj.price =
            resp.length > 1
              ? resp.reduce((a, b) =>
                  a.product
                    ? (
                        Number(a.product.price) + Number(b.product.price)
                      ).toFixed(2)
                    : (Number(a) + Number(b.product.price)).toFixed(2)
                )
              : resp[0].product.price;

          // Stored origin order information
          newObj.orderinfo = orderHistory.filter(
            (item) => item.id == itemId
          )[0];
          // Stops loading for details view
          setDetailsLoading(false);

          // Pushes newObj as new state for activeOrder
          return newObj;
        });
      });
    } else {
      setCurrentOrder({
        orderinfo: {},
        products: [],
      });
    }
  }, [itemId, orderHistory]);

  return (
    //   Add loaging if loading

    // Map over Order History and put them in paper

    <div className={classes.root}>
      {/* // Add grid to seperate this into two parts. */}
      <h1>Your Orders</h1>
      <Grid container spacing={0}>
        <Grid item xs={12} md={itemId ? 6 : 12}>
          {listLoading ? (
            <Paper>
              <CircularProgress />
            </Paper>
          ) : orderHistory.length > 0 ? (
            orderHistory.map((item) => (
              <Paper key={item.created_at} classProps="order-history-list">
                <div className="order-details-main-view">
                  <h2>Order placed on: {item.created_at.split("T")[0]}</h2>
                  <Link to={`/profile/order-history/${item.id}`}>
                    <h3>Details</h3>
                  </Link>
                </div>
                <Expansion
                  className="order-details-mobile-view"
                  arrowLink={`/profile/order-history/${item.id}`}
                  summary={
                    <>
                      <h2>Order placed on: {item.created_at.split("T")[0]}</h2>
                    </>
                  }
                  details={
                    item.id == itemId && (
                      <OrderDetails
                        currentOrder={currentOrder}
                        loading={detailsLoading}
                      />
                    )
                  }
                  routeClose={`/profile/order-history/`}
                  routeOpen={`/profile/order-history/${item.id}`}
                  isOpen={item.id == itemId}
                />
              </Paper>
            ))
          ) : (
            <Paper classProps="order-history-list">
              <h2>
                No Order History... yet! Finish an order and it will show up
                here!
              </h2>
              <Link to={`/`}>View products to add to cart</Link>
            </Paper>
          )}
        </Grid>
        {itemId && (
          <OrderDetails
            className="order-details-main-view"
            currentOrder={currentOrder}
            loading={detailsLoading}
          />
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
