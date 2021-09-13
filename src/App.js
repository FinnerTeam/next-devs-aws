import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import Login from "views/Login/Login.js";
import SignUp from "views/SignUp/SignUp.js";
import RTL from "layouts/RTL.js";
import Toast from "components/Messages/toast";
import { createBrowserHistory } from "history";
import { authActions } from "store/Auth/actions";
import { logOut } from "store/Auth/helpers";
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
      storedData.accessToken &&
      storedData.refreshToken &&
      new Date(storedData.tokenExpTime) > new Date()
    ) {
      dispatch(
        authActions.storeData({
          accessToken: storedData.accessToken,
          refreshToken: storedData.refreshToken,
          remainingTime: storedData.tokenExpTime,
          isLoggedIn: true,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && user.accessToken && user.refreshToken && user.tokenExpTime) {
      const remainingTime =
        user.tokenExpTime.toLocaleTimeString().getTime() - new Date().getTime();
      logoutTimer = setTimeout(logOut(), remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [dispatch, hist, user]);

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
