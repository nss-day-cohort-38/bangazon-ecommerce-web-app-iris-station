import React, { useState, createRef, useEffect } from "react";
import { Paper, PaymentForm } from "../../../components";
import { orderManager, orderProductManager } from "../../../modules";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Sticky, Ref, Icon } from "semantic-ui-react";
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
  const [activeOrder, setActiveOrder] = useState({
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
          resp.filter((item) => (item.payment_type_id ? true : false))
        );
        setListLoading(false);
      });
  }, []);

  useEffect(() => {
    if (itemId && orderHistory.length > 0) {
      let token = window.sessionStorage.getItem("token");
      setDetailsLoading(true);
      orderProductManager.getProductsbyOrder(token, itemId).then((resp) => {
        setActiveOrder((prevState) => {
          let newObj = { ...prevState };

          newObj.products = {};

          resp.map((item) => {
            let product = item.product;
            if (newObj.products[item.product.id]) {
              console.log(item);
              newObj.products[item.product.id].instances.push(item.id);
            } else {
              newObj.products[item.product.id] = {
                ...item.product,
                instances: [item.id],
              };
              console.log(item);
            }
          });

          console.log(newObj.products);

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

          newObj.orderinfo = orderHistory.filter(
            (item) => item.id == itemId
          )[0];
          setDetailsLoading(false);
          return newObj;
        });
      });
    } else {
      setActiveOrder({
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
        <Grid item xs={itemId ? 6 : 8}>
          {listLoading ? (
            <Paper>
              <CircularProgress />
            </Paper>
          ) : orderHistory.length > 0 ? (
            orderHistory.map((item) => (
              <Paper key={item.created_at} classProps="order-history-list">
                <div>Order placed on: {item.created_at}</div>
                <Link to={`/profile/order-history/${item.id}`}>Details</Link>
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
          <>
            <Grid item xs={6}>
              {detailsLoading ? (
                <Paper>
                  <CircularProgress />
                </Paper>
              ) : (
                activeOrder.orderinfo && (
                  <Paper classProps="order-details-column">
                    <h1>Order Details</h1>
                    <div className="paper-header">
                      <div>{activeOrder.orderinfo.created_at}</div>
                      <div>
                        <Link to="/profile/order-history">
                          <Icon name="x" />
                        </Link>
                      </div>
                    </div>
                    <div>Price:{activeOrder.price}</div>
                    <div>
                      <h2>Products</h2>
                      {/* {activeOrder.products.map((item) => {
                        let product = item.product;
                        // console.log(product);

                        return (
                          <Paper>
                            <div className="paper-header">
                              <div>
                                <Link to={`/products/${product.id}`}>
                                  {product.title}
                                </Link>
                              </div>
                              <div>
                                <Link to="/profile/order-history">
                                  <Icon name="x" />
                                </Link>
                              </div>
                            </div>

                            <div>Price:{activeOrder.price}</div>
                          </Paper>
                        );
                      })} */}
                    </div>
                    zxczxcz
                  </Paper>
                )
              )}
            </Grid>
          </>
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
