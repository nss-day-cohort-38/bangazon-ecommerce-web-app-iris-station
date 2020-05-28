import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { DLHOME, Profile } from "./index";
import { Navbar } from "../components";
import "../styles/Global.css";
import ProductForm from "./products/ProductForm";
import { HomePage } from "./home/index";
import { ProductDetails } from "./products/index";
import { Register, Login } from "../pages/users/index";
import MyProducts from "./products/MyProducts";
import { MyCart, Checkout } from "./orders/index";

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
        navArray={
          hasUser
            ? [
                { title: "Sell a Product", route: "/products/form" },
                { title: "Profile" },
                { title: "My Products", route: "/products/myproducts" },
                {
                  title: <i className="shopping cart icon"></i>,
                  route: "/mycart",
                }
              ]
            : [
                { title: "Login", route: "login" },
                { title: "Register", route: "register" },
              ]
        }
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
          {/* ROUTE FOR MY CART */}
          <Route
            exact
            path="/mycart"
            render={(props) => {
              if (hasUser) {
                return <MyCart {...props} />;
              } else {
                return <HomePage {...props} />;
              }
            }}
          />
          {/* ROUTE FOR CHECKOUT */}
          <Route
            exact
            path="/checkout"
            render={(props) => {
              if (hasUser) {
                return <Checkout {...props} />;
              } else {
                return <HomePage {...props} />;
              }
            }}
          />
          <Route
            exact
            path="/products/form"
            render={(props) => {
              if (hasUser) {
                return <ProductForm {...props} />;
              } else {
                return <HomePage {...props} />;
              }
            }}
          />
          <Route
            exact
            path="/products/myproducts"
            render={(props) => {
              if (hasUser) {
                return <MyProducts {...props} />;
              } else {
                return <HomePage {...props} />;
              }
            }}
          />
          <Route
            path="/dl/:component_name"
            render={(props) => {
              if (hasUser) {
                return <DLHOME {...props} />;
              } else {
                return <HomePage {...props} />;
              }
            }}
          />
          {/* This will handle all routes that are for the profile section */}
          <Route
            exact
            path="/profile/:category"
            render={(props) => {
              if (hasUser) {
                return <Profile {...props} />;
              } else {
                return <HomePage {...props} />;
              }
            }}
          />
          <Route
            exact
            path="/profile/:category/:itemId(\d+)"
            render={(props) => {
              if (hasUser) {
                return <Profile {...props} />;
              } else {
                return <HomePage {...props} />;
              }
            }}
          />

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
