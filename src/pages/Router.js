import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { DLHOME, Profile } from "./index";
import { Navbar } from "../components";
import { HomePage } from "./home/index";
import { ProductDetails } from "./products/index";
import { Register, Login } from "../pages/users/index";
import "../styles/Global.css"

const Routes = () => {
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());
  const [userInfo, setUserInfo] = useState({});

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    setHasUser(isAuthenticated());
  };

  // TODO: Implement this with router/navbar
  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  };

  return (
    <Router>
      {/* 
        TODO: Login and register should conditionally display,
        depending on if a user is logged in or not
       */}

      <Navbar
        navArray={[
          { title: "Profile" },
          { title: "Login", route: "/login" },
          { title: "Register", route: "/register" },
        ]}
        hasUser={hasUser}
      />
      <div className="body-container">
        <Switch>
          <Route exact path="/" render={(props) => <HomePage {...props} />} />

          {/* ADD CUSTOMER ROUTES BELOW */}
          <Route
            exact
            path="/customers"
            render={(props) => <Customer {...props} />}
          />

          {/* ADD ORDER ROUTES BELOW */}
          <Route
            exact
            path="/orders"
            render={(props) => <Order {...props} />}
          />

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

          {/* If not Authenticated, this route will take you to the login page */}
          <Route
            exact
            path="/profile"
            render={(props) =>
              hasUser ? <Profile {...props} /> : <Redirect to="/login" />
            }
          />

          {hasUser ? (
            <>
              {/* This will handle all routes that are for the profile section */}
              <Route
                exact
                path="/profile/:category"
                render={(props) => <Profile {...props} />}
              />
              <Route
                exact
                path="/profile/:category/:itemId(\d+)"
                render={(props) => <Profile {...props} />}
              />
              <Route
                path="/dl/:component_name"
                render={(props) => <DLHOME {...props} />}
              />
            </>
          ) : (
            ""
          )}

          {/* Will redirect to home page if page does not exist */}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

// const Home = () =>
const Customer = () => "Customer page";
const Order = () => "Orders page";
const Payment = () => "Payment page";
const Product = () => "Product page";

export { Routes };
