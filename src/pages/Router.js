import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  
} from "react-router-dom";
import { DefaultContainer } from "./index";
import { Register, Login } from "../pages/users/index";

const Routes = (props) => {
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

  return (
    <Router>
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

        {/* Below will render routes with navbar on top */}
        <Route
          render={(props) => (
            <DefaultContainer
              hasUser={hasUser}
              setUserToken={setUserToken}
              searchField={searchField}
              submittedSearchField={submittedSearchField}
              userInfo={userInfo}
              clearUser={clearUser}
              handleSearchChange={handleSearchChange}
              handleSubmit={handleSubmit}
            />
          )}
        />
      </Switch>
    </Router>
  );
};


export { Routes };
