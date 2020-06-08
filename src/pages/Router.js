import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Register, Login } from "../pages/users/index";
import { DLHOME, Profile, Reports } from "./index";
import { Navbar } from "../components";
import "../styles/Global.css";
import { ProductFormMaster } from "./products/";
import { HomePage } from "./home/index";
import { ProductDetails } from "./products/index";
import MyProducts from "./products/MyProducts";
import { MyCart, Checkout } from "./orders/index";
import SearchForm from "../components/form/searchForm";

const Routes = (props) => {
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());
  const [userInfo, setUserInfo] = useState({});
  const [hotdog, setHotdog] = useState(false);

  const clearUser = () => {
    sessionStorage.clear();
    setHotdog(false);
    setHasUser(isAuthenticated());
  };

  useEffect(() => {
    setHotdog(JSON.parse(window.sessionStorage.getItem("hotdog")));
  }, []);

  const handleHotdog = () => {
    setHotdog(!hotdog);
    window.sessionStorage.setItem("hotdog", !hotdog);
  };

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    setHasUser(isAuthenticated());
  };

  const [searchField, setSearchField] = useState({
    keyword: "",
  });
  const [submittedSearchField, setSubmittedSearchField] = useState({
    keyword: "",
  });

  const handleSearchChange = (e) => {
    const stateToChange = { ...searchField };
    stateToChange[e.target.id] = e.target.value.toLowerCase();
    setSearchField(stateToChange);
  };

  const handleSubmit = () => {
    setSubmittedSearchField(searchField);
  };

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
        {/* Below will render routes with navbar on top */}
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

        <div className="body-container">
          <Route
            exact
            path="/"
            render={(props) =>
              searchField ? (
                <>
                  <HomePage {...props} />{" "}
                </>
              ) : (
                <Redirect to="/search" />
              )
            }
          />

          <Route
            exact
            path="/products/form"
            render={(props) =>
              hasUser ? (
                <>
                  <ProductFormMaster {...props} />
                </>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            exact
            path="/search"
            render={(props) => (
              <>
                <SearchForm searchField={submittedSearchField} />
              </>
            )}
          />

          <Route
            exact
            path="/products/myproducts"
            render={(props) =>
              hasUser ? (
                <>
                  <MyProducts {...props} />{" "}
                </>
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
              <>
                <ProductDetails
                  productId={parseInt(props.match.params.productId)}
                  {...props}
                />
              </>
            )}
          />

          {/* If not Authenticated, this route will take you to the login page */}
          <Route
            exact
            path="/profile"
            render={(props) =>
              hasUser ? (
                <>
                  <Profile {...props} />
                </>
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          {/* If not Authenticated, this route will take you to the home page */}
          {/* Routes for Reports */}
          <Route
            exact
            path="/reports"
            render={(props) =>
              hasUser ? (
                <>
                  <Reports {...props} />
                </>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            exact
            path="/reports/:report_type"
            render={(props) =>
              hasUser ? (
                <>
                  <Reports {...props} />
                </>
              ) : (
                <Redirect to="/reports" />
              )
            }
          />

          {/* ROUTE FOR MY CART */}
          <Route
            exact
            path="/mycart"
            render={(props) =>
              hasUser ? (
                <>
                  <MyCart {...props} />
                </>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          {/* ROUTE FOR CHECKOUT */}
          <Route
            exact
            path="/checkout"
            render={(props) =>
              hasUser ? (
                <>
                  <Checkout {...props} />
                </>
              ) : (
                <Redirect to="/" />
              )
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

const DefaultRoute = ({ exact, path, render, navState }) => {
  return (
    <>
      <Route
        exact={exact}
        path={path}
        render={(props) => <>{render(props)}</>}
      />
    </>
  );
};

/* const DefaultRoute = ({ exact, path, render, navState }) => {
  return (
    <>
      <Route
        exact={exact}
        path={path}
        render={(props) => (
          <>
            <Navbar
              navArray={
                navState.hasUser
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
              hasUser={navState.hasUser}
              clearUser={navState.clearUser}
              searchField={navState.searchField}
              handleSearchChange={navState.handleSearchChange}
              handleSubmit={navState.handleSubmit}
              handleHotdog={navState.handleHotdog}
              hotdog={navState.hotdog}
            />
            {render(props)}
          </>
        )}
      />
    </>
  );
}; */
export { Routes };
