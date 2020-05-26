import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "../buttons";

export default function PaymentForm({
  handleSubmit,
  handleChange,
  formState,
  submitMessage,
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="merchantName"
              label="Merchant Name"
              name="merchantName"
              fullWidth
              value={formState.merchantName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="number"
              id="cardNumber"
              label="Card number"
              name="accountNumber"
              value={formState.accountNumber}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="expDate"
              type="date"
              name="expirationDate"
              value={formState.expirationDate}
              label="Expiry date"
              format="YYYY"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" content="Submit" />
          </Grid>
          {submitMessage && (
            <Typography variant="h3" gutterBottom>
              {submitMessage}
            </Typography>
          )}
        </Grid>
      </form>
    </React.Fragment>
  );
}
