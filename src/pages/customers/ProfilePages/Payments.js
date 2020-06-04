import React, { useState, useEffect } from "react";
import { PaymentDataManager } from "../../../modules";
import { Paper, Expansion, Button } from "../../../components";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../../styles/OrderHistory.css";

const PaymentPage = ({}) => {
  // Order History needs to be stored in state as an array
  const [paymentType, setPaymentType] = useState([]);
  // Set Loading in state
  const [listLoading, setListLoading] = useState(false);

  const getPayments = () => {
    PaymentDataManager.getAll(window.sessionStorage.getItem("token")).then(
      (resp) => {
        setPaymentType(resp);
        // Stops loading
        setListLoading(false);
      }
    );
  };
  useEffect(() => {
    //   Start Loading
    setListLoading(true);
    //   Get Order History from database
    getPayments();
  }, []);

  const handleClick = (paymentId) => {
    PaymentDataManager.delete(
      window.sessionStorage.getItem("token"),
      paymentId
    ).then((resp) => {
      getPayments();
    });
  };

  return (
    //   Add loaging if loading

    // Map over Order History and put them in paper

    <div>
      {/* // Add grid to seperate this into two parts. */}
      <h1>Your Payment Types</h1>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {listLoading ? (
            <Paper>
              <CircularProgress />
            </Paper>
          ) : paymentType.length > 0 ? (
            <>
              <Paper>
                <Grid container spacing={0}>
                  <Grid container item spacing={0} xs={12}>
                    <Grid item xs={6} className="card-number-column">
                      Your payments
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3} className="card-expiration-column">
                      Expires
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    {paymentType.map((item) => {
                      let lastFourDigits = item.account_number.substring(
                        item.account_number.length - 4
                      );
                      let splitExDate = `${
                        item.expiration_date.split("-")[1]
                      }/${item.expiration_date.split("-")[0]}`;

                      let addedDateNoTime = item.created_at.split("T")[0];

                      let splitAddedDate = `${addedDateNoTime.split("-")[1]}/${
                        addedDateNoTime.split("-")[2]
                      }/${addedDateNoTime.split("-")[0]}`;
                      return (
                        <Expansion
                          key={item.id}
                          classProps="payment-list"
                          summary={
                            <>
                              <Grid container spacing={0}>
                                <Grid
                                  item
                                  xs={12}
                                  md={6}
                                  className="card-number-column"
                                >
                                  <img src="https://images-na.ssl-images-amazon.com/images/G/01/payments/instrument_image/debit._CB485933941_.gif" />{" "}
                                  Debit Card ending in {lastFourDigits}
                                </Grid>
                                <Grid item xs={12} md={3}></Grid>
                                <Grid
                                  item
                                  xs={12}
                                  md={3}
                                  className="card-expiration-column"
                                >
                                  {splitExDate}
                                </Grid>
                              </Grid>
                              <p></p> <p></p>
                            </>
                          }
                          details={
                            <>
                              <Grid container spacing={0}>
                                <Grid item xs={4}>
                                  <p>Merchant: {item.merchant_name}</p>
                                </Grid>
                                <Grid item xs={4}>
                                  <p>Added On: {splitAddedDate}</p>
                                </Grid>
                                <Grid item xs={4}>
                                  <Button
                                    content="Remove"
                                    handleClick={() => handleClick(item.id)}
                                  />
                                </Grid>
                              </Grid>
                            </>
                          }
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </Paper>
            </>
          ) : (
            <Paper classProps="payment-list">
              <h2>No Payments Added</h2>
              <Link to={`/profile/add-payment`}>Add Payment Here</Link>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentPage;
