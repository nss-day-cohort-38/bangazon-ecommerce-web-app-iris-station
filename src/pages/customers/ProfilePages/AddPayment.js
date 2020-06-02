import React, { useState } from "react";
import { Paper, PaymentForm } from "../../../components";
import { PaymentDataManager } from "../../../modules";

const AddPaymentPage = () => {
  const [paymentForm, setPaymentForm] = useState({
    merchantName: "",
    accountNumber: "",
    expirationMonth: "",
    expirationYear: "",
  });
  const [formErrors, setFormErrors] = useState({
    merchantName: "",
    accountNumber: "",
    expirationMonth: "",
    expirationYear: "",
  });

  const months = [...Array(12).keys()].map((x) => `${x + 1}`);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [monthChoices, setMonthChoices] = useState(months);
  const [yearChoices, setYearChoices] = useState([]);

  const handleChange = (e) => {
    if (submitMessage) {
      setSubmitMessage("");
    }
    const name = e.target.name;
    const value = e.target.value;
    setPaymentForm((prevState) => {
      let newObj = { ...prevState };
      newObj[name] = value;
      return newObj;
    });

    if (name == "expirationMonth") {
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      if (value > month) {
        setYearChoices([...Array(21).keys()].map((x) => x + Number(year)));
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
    let errors = [];
    Object.keys(paymentForm).map((item) => {
      if (paymentForm[item] == "") {
        errors.push([item, "Required"]);
      }
    });

    if (errors.length > 0) {
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
      PaymentDataManager.addPayment(token, {
        merchant_name: paymentForm.merchantName,
        account_number: paymentForm.accountNumber,
        expiration_date: `${paymentForm.expirationYear}-${paymentForm.expirationMonth}-01`,
      }).then((resp) => {
        if (resp.status === 200) {
          setSubmitMessage("Payment Added");
          let clearObj = {
            merchantName: "",
            accountNumber: "",
            expirationMonth: "",
            expirationYear: "",
          };
          setPaymentForm(clearObj);
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
        monthChoices={monthChoices}
        yearChoices={yearChoices}
        errorMessage={errorMessage}
        formErrors={formErrors}
      />
    </Paper>
  );
};

export default AddPaymentPage;
