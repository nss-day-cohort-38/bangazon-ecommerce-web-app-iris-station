import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { DLHOME } from "./index";
import { Navbar } from "../components";
import ProductForm from "./products/ProductForm"
import { HomePage } from "./home/index"

const Routes = () => {
  const [userInfo, stUserInfo] = useState({});

  return (
    <Router>
      <Navbar navArray={[{ title: "Route Name", route: "example" }, { title: "Sell a Product", route: "/products/form" }]} />
      <Switch>
        <Route exact path="/" render={(props) => <HomePage {...props} />} />

        {/* ADD CUSTOMER ROUTES BELOW */}
        <Route
          exact
          path="/customers"
          render={(props) => <Customer {...props} />}
        />

        {/* ADD ORDER ROUTES BELOW */}
        <Route exact path="/orders" render={(props) => <Order {...props} />} />

        {/* ADD PAYMENT ROUTES BELOW */}
        <Route
          exact
          path="/payments"
          render={(props) => <Payment {...props} />}
        />

        {/* ADD PRODUCTS ROUTES BELOW */}
        <Route
          exact
          path="/products"
          render={(props) => <Product {...props} />}
        />

        {/* Will redirect to home page if page does not exist */}
        <Route
          path="/dl/:component_name"
          render={(props) => <DLHOME {...props} />}
        />

        <Route
          exact
          path="/products/form"
          render={(props) => <ProductForm {...props} />}
        />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

// const Home = () => 
const Customer = () => "Customer page";
const Order = () => "Orders page";
const Payment = () => "Payment page";
const Product = () => "Product page";

export { Routes };
