import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toastOpen: false,
    toastType: "success",
    toastMessage: "",
  },
  reducers: {
    setToast(state, action) {
      return {
        toastOpen: action.payload.open,
        toastType: action.payload.type,
        toastMessage: action.payload.msg,
      };
    },
  },
});

export const toastActions = toastSlice.actions;
export default toastSlice;
