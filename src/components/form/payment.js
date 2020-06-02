import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "../buttons";
import { Message } from "semantic-ui-react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    padding: 0,
  }

}));

export default function PaymentForm({
  handleSubmit,
  handleChange,
  formState = { merchantName: "" },
  submitMessage,
  monthChoices = [],
  yearChoices = [],
  errorMessage,
  formErrors,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              error={formErrors.merchantName ? true : false}
            >
              <TextField
                required
                id="merchantName"
                label="Merchant Name"
                name="merchantName"
                // fullWidth
                value={formState.merchantName}
                onChange={handleChange}
              />
              <FormHelperText>{formErrors.merchantName}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl
              error={formErrors.accountNumber ? true : false}
              fullWidth
            >
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
              <FormHelperText>{formErrors.accountNumber}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={1}>
            <FormControl
              error={formErrors.expirationMonth ? true : false}
              required
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                required
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formState.expirationMonth}
                onChange={handleChange}
                name="expirationMonth"
                inputProps={{
                  required: true,
                }}
              >
                <MenuItem value="">Select</MenuItem>
                {monthChoices.map((month, i) => (
                  <MenuItem key={i} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{formErrors.expirationMonth}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl
              error={formErrors.expirationYear ? true : false}
              required
              fullWidth
              disabled={formState.expirationMonth == "" ? true : false}
            >
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                inputProps={{
                  required: true,
                }}
                name="expirationYear"
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formState.expirationYear}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                {yearChoices.map((year, i) => (
                  <MenuItem key={i} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{formErrors.expirationYear}</FormHelperText>
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
          <Grid item xs={12}>
            {errorMessage && (
              <Typography variant="h6" gutterBottom>
                <Message negative>{errorMessage}</Message>
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
