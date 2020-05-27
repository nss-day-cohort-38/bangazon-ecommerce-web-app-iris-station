import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { DLHOME, Profile } from "./index";
import { Navbar } from "../components";
import { HomePage } from "./home/index"
import { ProductDetails } from "./products/index"
import {Register, Login} from "../pages/users/index";

const Routes = () => {
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());
  const [userInfo, setUserInfo] = useState({});

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  };

  return (
    <Router>
      <Navbar 
        navArray={
          [
            { title: "Customers", route: "customers" },
            { title: "Orders", route: "orders" },
            { title: "Products", route: "products" },
            { title: "Payments", route: "payments" }
          ]    
        } 
        hasUser={hasUser}
        clearUser={clearUser}
      />
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
        {/* this will route to a product detail page */}
        <Route
          exact
          path="/products/:productId(\d+)"
          render={(props) => (
            <ProductDetails
              productId={parseInt(props.match.params.productId)}
              {...props}
            />
          )}
        />
        {hasUser 
          ? (
            <>
              <Route
                exact
                path="/profile"
                render={(props) => <Profile {...props} />}
              />

              <Route
                exact
                path="/profile/:category"
                render={(props) => <Profile {...props} />}
              />
            </>
          )
          : (
            <>
              <Route
                exact
                path="/login"
                render={(props) => <Login setUserToken={setUserToken} {...props} />}
              />
    
              <Route
                exact
                path="/register"
                render={(props) => (
                  <Register setUserToken={setUserToken} {...props} />
                )}
              />
            </>
          )
        }

        {/* Will redirect to home page if page does not exist */}
        <Route
          path="/dl/:component_name"
          render={(props) => <DLHOME {...props} />}
        />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

const Customer = () => "Customer page";
const Order = () => "Orders page";
const Payment = () => "Payment page";
const Product = () => "Product page";

export { Routes };
