import React, { useEffect, useCallback } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import Login from "views/Login/Login.js";
import SignUp from "views/SignUp/SignUp.js";
import RTL from "layouts/RTL.js";
import Toast from "components/Messages/toast";
import { createBrowserHistory } from "history";
import { authActions } from "store/auth";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "PrivateRoute";
let logoutTimer;

export default function App() {
  const hist = createBrowserHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authActions);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.tokenExpTime) > new Date()
    ) {
      dispatch(
        authActions.storeData({
          token: storedData.token,
          remainingTime: storedData.tokenExpTime,
          isLoggedIn: true,
        })
      );
    }
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(authActions.logOut());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.token && user.tokenExpTime) {
      const remainingTime =
        user.tokenExpTime.toLocaleTimeString().getTime() - new Date().getTime();
      logoutTimer = setTimeout(logOut, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [dispatch, hist, user, logOut]);

  return (
    <>
      <Toast />
      <Router history={hist}>
        <Switch>
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={SignUp} />
          <PrivateRoute path="/rtl" component={RTL} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </>
  );
}
