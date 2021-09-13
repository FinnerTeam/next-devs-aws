import axios from "axios";
import { authActions } from "./actions";
import { SERVER_URL } from "../../url";
export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authActions.storeData({ isLoading: true, error: null }));
    try {
      const response = await axios.post(`${SERVER_URL}/auth/login`, {
        email,
        password,
      });
      const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          tokenExpTime: tokenExpTime.toISOString(),
        })
      );
      dispatch(
        authActions.storeData({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          tokenExpTime,
          isLoggedIn: true,
          isLoading: false,
        })
      );
    } catch {
      dispatch(
        authActions.storeData({
          isLoading: false,
          error: "Email or password are incorrect.",
        })
      );
    }
  };
};

export const logOut = async () => {
  const { accessToken, refreshToken } = JSON.parse(
    localStorage.getItem("userData")
  );
  try {
    const response = await axios.post(`${SERVER_URL}/auth/logout`, {
      accessToken,
      refreshToken,
    });
    return async (dispatch) => {
      console.log(response);
      dispatch(authActions.logOut());
    };
  } catch (err) {
    console.log(err);
  }
};

export const getNewTokens = (refreshToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${SERVER_URL}/auth/token`, {
        refreshToken,
      });
      localStorage.removeItem("userData");
      const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          tokenExpTime: tokenExpTime.toISOString(),
        })
      );
    } catch {
      dispatch(authActions.logOut());
    }
  };
};
