import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "url";

const initialState = {
  isLoggedIn: false,
  token: null,
  tokenExpTime: null,
  isLoading: false,
  error: null,
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authActions.storeData({ isLoading: true, error: null }));
    try {
      const response = await axios.post(
        "https://next-devs12.herokuapp.com/auth/login",
        {
          email,
          password,
        }
      );
      const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: response.data.token,
          tokenExpTime: tokenExpTime.toISOString(),
        })
      );
      dispatch(
        authActions.storeData({
          token: response.data.token,
          tokenExpTime,
          isLoggedIn: true,
          isLoading: false,
        })
      );
    } catch (err) {
      dispatch(
        authActions.storeData({
          isLoading: false,
          error: "Email or password are incorrect.",
        })
      );
    }
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem("userData");
      return {
        isLoggedIn: false,
        token: null,
        tokenExpTime: null,
        isLoading: false,
        error: null,
      };
    },
    storeData(state, action) {
      const data = action.payload;
      return {
        isLoggedIn: data.isLoggedIn || state.isLoggedIn,
        token: data.token || state.token,
        remainingTime: data.remainingTime || state.remainingTime,
        isLoading: data.isLoading || state.isLoading,
        error: data.error || state.error,
      };
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
