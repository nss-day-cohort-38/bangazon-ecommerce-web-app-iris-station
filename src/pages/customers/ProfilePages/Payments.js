import React, { useState, useEffect } from "react";
import { PaymentDataManager } from "../../../modules";
import { Paper, Expansion, Button } from "../../../components";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "semantic-ui-react";
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
      getPayments()
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
            paymentType.map((item) => (
              <Paper key={item.id} classProps="payment-list">
                <h2>Merchant: {item.merchant_name}</h2>
                <h2>Account_number: {item.account_number}</h2>
                <h2>Date added: {item.created_at.split("T")[0]}</h2>
                <h2>Expiration date: {item.expiration_date}</h2>

                <Button
                  content="Delete Payment"
                  handleClick={() => handleClick(item.id)}
                />
              </Paper>
            ))
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
