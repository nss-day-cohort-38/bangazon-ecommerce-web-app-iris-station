import React, { useState } from "react";
import { Paper, PaymentForm } from "../../../components";
import { PaymentDataManager } from "../../../modules";

const AddPaymentPage = () => {
  const [paymentForm, setPaymentForm] = useState({
    merchantName: "",
    accountNumber: "",
    expirationDate: "2020-01-14",
  });

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
    let data = paymentForm.expirationDate;
    console.log(date);

    // PaymentDataManager.addPayment("9134c6b2e84e0394198e2cbe0a8bd2c1e9a0adbc", {
    //   merchant_name: paymentForm.merchantName,
    //   account_number: paymentForm.accountNumber,
    //   expiration_date: data["expiration_date"],
    //   customer: 4,
    // });
    // console.log("submitted");
  };

  return (
    <Paper>
      <PaymentForm
        formState={paymentForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Paper>
  );
};

export default AddPaymentPage;
