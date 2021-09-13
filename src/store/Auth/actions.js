import { createSlice } from "@reduxjs/toolkit";
// import { config } from "url";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  tokenExpTime: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem("userData");
      return {
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
        tokenExpTime: null,
        isLoading: false,
        error: null,
      };
    },
    storeData(state, action) {
      const data = action.payload;
      return {
        isLoggedIn: data.isLoggedIn || state.isLoggedIn,
        accessToken: data.accessToken || state.accessToken,
        refreshToken: data.refreshToken || state.refreshToken,
        remainingTime: data.remainingTime || state.remainingTime,
        isLoading: data.isLoading || false,
        error: data.error || state.error,
      };
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
