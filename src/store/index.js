import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import toastSlice from "./toast";
import userSlice from "./user";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toast: toastSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
