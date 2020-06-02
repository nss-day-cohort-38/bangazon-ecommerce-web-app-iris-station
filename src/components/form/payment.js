import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "../buttons";
import { Message } from "semantic-ui-react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export default function PaymentForm({
  handleSubmit,
  handleChange,
  formState = { merchantName: "" },
  submitMessage,
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={2}>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              fullWidth
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formState.expirationMonth}
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl className={classes.formControl} disabled>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                disabled={formState.expirationMonth !== "" ? true : false}
                fullWidth
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formState.expirationYear}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button type="submit" content="Submit" />
          </Grid>
          <Grid item xs={12}>
            {submitMessage && (
              <Typography variant="h8" gutterBottom>
                <Message positive>{submitMessage}</Message>
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
