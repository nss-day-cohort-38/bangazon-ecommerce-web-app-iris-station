import React from "react";
import { Paper, Expansion } from "../../../components";
import Grid from "@material-ui/core/Grid";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../../styles/OrderHistory.css";

const OrderDetails = ({ loading, currentOrder, className }) => {
  return (
    <Grid item xs={12} md={6} className={className}>
      {loading ? (
        <Paper>
          <CircularProgress />
        </Paper>
      ) : (
        currentOrder.orderinfo && (
          <Paper classProps="order-details-column">
            <div className="order-details-title">
              <h1>Order Details</h1>
              <div>
                <Link to="/profile/order-history">
                  <Icon name="x" />
                </Link>
              </div>
            </div>
            <div className="order-details-content">
              <div className="paper-header">
                <div>
                  <h2>Total Price: {currentOrder.price}</h2>
                </div>
                <div>
                  <h2>
                    Date:{" "}
                    {currentOrder.orderinfo.created_at &&
                      currentOrder.orderinfo.created_at.split("T")[0]}
                  </h2>
                </div>
              </div>
              <div>
                <br></br>
                <h2>
                  {currentOrder.orderinfo.payment_type
                    ? `Paid with Card ending in
                          ${currentOrder.orderinfo.payment_type.account_number.substring(
                            currentOrder.orderinfo.payment_type.account_number
                              .length - 4
                          )}`
                    : "asd"}
                </h2>

                <br></br>
                <h2>Products</h2>
                {Object.values(currentOrder.products).map((item) => {
                  return (
                    <Paper key={item.id}>
                      <div className="paper-body">
                        <div className="paper-text-container-beside-image">
                          <div>
                            <Link to={`/products/${item.id}`}>
                              {item.title}
                            </Link>
                          </div>
                          <div>Quantity: {item.instances.length}</div>
                          <div>Price: {item.price}</div>
                          <hr />
                          <div>
                            {item.description.length > 40 ? (
                              <Expansion
                                summary={`${item.description.substring(
                                  0,
                                  40
                                )}...`}
                                details={item.description}
                              />
                            ) : (
                              item.description
                            )}
                          </div>
                        </div>

                        <div className="paper-image-container">
                          <img
                            className="paper-image"
                            src={
                              item.image_path === null
                                ? `${process.env.PUBLIC_URL}/noimage.png` 
                                : item.image_path
                            }
                          />
                        </div>
                      </div>
                    </Paper>
                  );
                })}
              </div>
            </div>
          </Paper>
        )
      )}
    </Grid>
  );
};

export default OrderDetails;
