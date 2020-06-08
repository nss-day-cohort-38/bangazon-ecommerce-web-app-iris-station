import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DLHOME, Profile, Reports } from "./index";
import { Navbar } from "../components";
import "../styles/Global.css";
import { ProductFormMaster } from "./products/";
import { HomePage } from "./home/index";
import { ProductDetails } from "./products/index";
import MyProducts from "./products/MyProducts";
import { MyCart, Checkout } from "./orders/index";
import SearchForm from "../components/form/searchForm";
import "../styles/Global.css";

const DefaultContainer = ({
  hasUser,
  searchField,
  submittedSearchField,
  userInfo,
  clearUser,
  handleSearchChange,
  handleSubmit,
}) => {
  return (
    <>
      <Navbar
        navArray={
          hasUser
            ? [
                { title: "Sell a Product", route: "/products/form" },
                { title: "My Products", route: "/products/myproducts" },
                { title: "Reports", route: "/reports" },
                {
                  title: <i className="shopping cart icon"></i>,
                  route: "/mycart",
                },
              ]
            : []
        }
        hasUser={hasUser}
        userInfo={userInfo}
        clearUser={clearUser}
        searchField={searchField}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
      />
      <div className="body-container">
        <Route
          exact
          path="/"
          render={(props) =>
            searchField ? <HomePage {...props} /> : <Redirect to="/search" />
          }
        />
        <Route
          exact
          path="/products/form"
          render={(props) =>
            hasUser ? <ProductFormMaster {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/search"
          render={(props) => <SearchForm searchField={submittedSearchField} />}
        />
        <Route
          exact
          path="/products/myproducts"
          render={(props) =>
            hasUser ? <MyProducts {...props} /> : <Redirect to="/" />
          }
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

        {/* If not Authenticated, this route will take you to the login page */}
        <Route
          exact
          path="/profile"
          render={(props) =>
            hasUser ? <Profile {...props} /> : <Redirect to="/login" />
          }
        />

        {/* If not Authenticated, this route will take you to the home page */}
        {/* Routes for Reports */}
        <Route
          exact
          path="/reports"
          render={(props) =>
            hasUser ? <Reports {...props} /> : <Redirect to="/" />
          }
        />

        <Route
          exact
          path="/reports/:report_type"
          render={(props) =>
            hasUser ? <Reports {...props} /> : <Redirect to="/reports" />
          }
        />

        {/* ROUTE FOR MY CART */}
        <Route
          exact
          path="/mycart"
          render={(props) =>
            hasUser ? <MyCart {...props} /> : <Redirect to="/" />
          }
        />

        {/* ROUTE FOR CHECKOUT */}
        <Route
          exact
          path="/checkout"
          render={(props) =>
            hasUser ? <Checkout {...props} /> : <Redirect to="/" />
          }
        />

        <Route
          exact
          path="/dl/:component_name"
          render={(props) => (
            <DLHOME {...props} userInfo={userInfo} hasUser={hasUser} />
          )}
        />

        {/* This will handle all routes that are for the profile section */}
        <Route
          exact
          path="/profile/:category"
          render={(props) =>
            hasUser ? <Profile {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/profile/:category/:itemId(\d+)"
          render={(props) =>
            hasUser ? <Profile {...props} /> : <Redirect to="/" />
          }
        />
      </div>
      {/* Will redirect to home page if page does not exist */}
      <Redirect to="/" />
    </>
  );
};

export default DefaultContainer;
