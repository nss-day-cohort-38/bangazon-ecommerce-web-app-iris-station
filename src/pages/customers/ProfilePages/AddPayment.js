import React, { useState } from "react";
import { Paper, PaymentForm } from "../../../components";
import { PaymentDataManager } from "../../../modules";

const AddPaymentPage = () => {
  const [paymentForm, setPaymentForm] = useState({
    merchantName: "",
    accountNumber: "",
    expirationMonth: "",
    expirationYear: ""
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPaymentForm((prevState) => {
      let newObj = { ...prevState };
      newObj[name] = value;
      return newObj;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = window.sessionStorage.getItem("token");
    PaymentDataManager.addPayment(token, {
      merchant_name: paymentForm.merchantName,
      account_number: paymentForm.accountNumber,
      expiration_date: paymentForm.expirationDate,
    }).then((resp) => {
      if (resp.status === 200) {
        setSubmitMessage("Payment Added");
      }
    });
  };

  return (
    <Paper>
      <PaymentForm
        formState={paymentForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitMessage={submitMessage}
      />
    </Paper>
  );
};

export default AddPaymentPage;
