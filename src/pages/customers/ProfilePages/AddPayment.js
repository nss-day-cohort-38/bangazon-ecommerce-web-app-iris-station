import React, { useState } from "react";
import { Paper, PaymentForm } from "../../../components";
import { PaymentDataManager } from "../../../modules";

const AddPaymentPage = () => {
  // Will hold all the values for payment form
  const [paymentForm, setPaymentForm] = useState({
    merchantName: "",
    accountNumber: "",
    expirationMonth: "",
    expirationYear: "",
  });
  // Will hold form errors values for payment form
  const [formErrors, setFormErrors] = useState({
    merchantName: "",
    accountNumber: "",
    expirationMonth: "",
    expirationYear: "",
  });
  
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearChoices, setYearChoices] = useState([]);

  const handleChange = (e) => {
    // Resets submit message if user tries to add another payment type
    if (submitMessage) {
      setSubmitMessage("");
    }

    const name = e.target.name;
    const value = e.target.value;
    // Updates state with new form values
    setPaymentForm((prevState) => {
      let newObj = { ...prevState };
      newObj[name] = value;
      return newObj;
    });

    // If expiration month is updated
    if (name == "expirationMonth") {
      // Get current month and year
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      // If user selected month is greater than current month then show 40 years ahead of this year including current year
      if (value > month) {
        setYearChoices([...Array(21).keys()].map((x) => x + Number(year)));

      // If user selected month is less than or equal to current month then show 40 years ahead of this year excluding current year
      } else {
        let years = [...Array(20).keys()].map((x) => x + Number(year) + 1);

        setYearChoices(years);
        if (paymentForm.expirationYear == year) {
          setPaymentForm((prevState) => ({
            ...prevState,
            expirationYear: years[0],
          }));
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = window.sessionStorage.getItem("token");
    // Holds array of errors needed
    let errors = [];
    Object.keys(paymentForm).map((item) => {
      // Adds error and message to arror array
      if (paymentForm[item] == "") {
        errors.push([item, "Required"]);
      }
    });

    // If errors were found
    if (errors.length > 0) {
      // Add corrospoding errors to error Object
      setFormErrors((prevState) => {
        let newObj = {
          merchantName: "",
          accountNumber: "",
          expirationMonth: "",
          expirationYear: "",
        };
        errors.map((item) => {
          newObj[item[0]] = item[1];
        });
        return newObj;
      });
    } else {
      // If no errors found, then post obj to database
      PaymentDataManager.addPayment(token, {
        merchant_name: paymentForm.merchantName,
        account_number: paymentForm.accountNumber,
        expiration_date: `${paymentForm.expirationYear}-${paymentForm.expirationMonth}-01`,
      }).then((resp) => {
        if (resp.status === 200) {
          // Show submit message
          setSubmitMessage("Payment Added");
          // Clear form information
          let clearObj = {
            merchantName: "",
            accountNumber: "",
            expirationMonth: "",
            expirationYear: "",
          };
          // Clear form information
          setPaymentForm(clearObj);
          // Clear form error messages
          setFormErrors(clearObj);
        }
      });
    }
  };

  return (
    <Paper>
      <PaymentForm
        formState={paymentForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitMessage={submitMessage}
        // An array with all month numbers in it
        monthChoices={[...Array(12).keys()].map((x) => `${x + 1}`)}
        yearChoices={yearChoices}
        errorMessage={errorMessage}
        formErrors={formErrors}
      />
    </Paper>
  );
};

export default AddPaymentPage;
