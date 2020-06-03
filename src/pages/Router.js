import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
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
import { userManager } from "../modules";
import SearchForm from "../components/form/searchForm";
import productManager from "../modules/productManager";
import orderManager from "../modules/orderManager";
import order_product_manager from "../modules/order_product_manager";

const Routes = (props) => {
  let history = useHistory();
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());
  const [userInfo, setUserInfo] = useState({});
  const [showNav, setShowNav] = useState(true);

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  };

  const getUserInfo = () => {
    userManager
      .getUser({ token: window.sessionStorage.getItem("token") })
      .then((resp) => {
        setUserInfo((prevState) => {
          return resp;
        });
      });
  };

  const [prods, setProds] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState({});
  const [searchField, setSearchField] = useState({
    keyword: "",
  });

  const handleSearchChange = (e) => {
    const stateToChange = { ...searchField };
    stateToChange[e.target.id] = e.target.value.toLowerCase();
    setSearchField(stateToChange);
  };

  return (
    <Router>
      <Navbar
        navArray={
          hasUser
            ? [
                { title: "Sell a Product", route: "/products/form" },
                { title: "My Products", route: "/products/myproducts" },
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
        history={history}
      />
      )
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) =>
            hasUser ? (
              <Redirect to="/" />
            ) : (
              <Login setUserToken={setUserToken} {...props} />
            )
          }
        />

        <div className="body-container">
          <Route
            exact
            path="/register"
            render={(props) =>
              hasUser ? (
                <Redirect to="/" />
              ) : (
                <Register setUserToken={setUserToken} {...props} />
              )
            }
          />
          <Route
            exact
            path="/"
            render={(props) =>
              searchField ? (
                <HomePage
                  {...props}
                />
              ) : (
                <SearchForm
                  {...props}
                  searchField={searchField}
                />
              )
            }
          />
          <Route
            exact
            path="/products/form"
            render={(props) =>
              hasUser ? <ProductForm {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/search"
            render={(props) => (hasUser ? <SearchForm searchField={searchField}/> : <Redirect to="/" />)}
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
      </Switch>
    </Router>
  );
};

const useReactPath = () => {
  const [path, setPath] = React.useState(window.location.pathname);
  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };
  React.useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return path;
};
export { Routes };
