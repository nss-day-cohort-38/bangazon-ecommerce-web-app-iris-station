import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { DLHOME, Profile, Reports } from "./index";
import { Navbar } from "../components";
import "../styles/Global.css";
import { ProductFormMaster } from "./products/";
import { HomePage } from "./home/index";
import { ProductDetails } from "./products/index";
import { Register, Login } from "../pages/users/index";
import MyProducts from "./products/MyProducts";
import { MyCart, Checkout } from "./orders/index";
import { ProductType } from "./products/index";
import SearchForm from "../components/form/searchForm";

const Routes = (props) => {
  let history = useHistory();
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());
  const [userInfo, setUserInfo] = useState({});
  const [hotdog, setHotdog] = useState(false);

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHotdog(false);
    setHasUser(isAuthenticated());
  };

  const [searchField, setSearchField] = useState({
    keyword: "",
  });
  const [submittedSearchField, setSubmittedSearchField] = useState({
    keyword: "",
  });
  const handleHotdog = () => {
    setHotdog(!hotdog);
    window.sessionStorage.setItem("hotdog", !hotdog);
  };
  const handleSearchChange = (e) => {
    const stateToChange = { ...searchField };
    stateToChange[e.target.id] = e.target.value.toLowerCase();
    setSearchField(stateToChange);
  };

  const handleSubmit = () => {
    setSubmittedSearchField(searchField);
  };

  useEffect(() => {
    setHotdog(JSON.parse(window.sessionStorage.getItem("hotdog")));
  }, []);

  // Add hotdog image url here
  document.body.style.cursor = hotdog
    ? `url("${process.env.PUBLIC_URL}/hotdog.png"), pointer`
    : "default";

  return (
    <Router>
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
        clearUser={clearUser}
        searchField={searchField}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
        handleHotdog={handleHotdog}
        hotdog={hotdog}
      />
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
        {/* <React.Fragment> */}
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
            render={(props) => (
              <SearchForm searchField={submittedSearchField} />
            )}
          />
          <Route
            exact
            path="/products/myproducts"
            render={(props) =>
              hasUser ? <MyProducts {...props} /> : <Redirect to="/" />
            }
          />

          {/* this will route will filter HomePage to product types */}
          <Route
            exact
            // path="/products/:productTypeName([\w ]+)"
            path="/products/category/:productTypeId(\d+)"
            render={(props) =>
              hasUser ? (
                <ProductType
                  productTypeId={parseInt(props.match.params.productTypeId)}
                  // productTypeName={props.match.params.productTypeName}
                  {...props}
                />
              ) : (
                <Redirect to="/" />
              )
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
        {/* </React.Fragment> */}
        {/* Will redirect to home page if page does not exist */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
export { Routes };
