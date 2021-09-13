import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../url";
const initialState = {
  userName: null,
  email: null,
  firstName: null,
  lastName: false,
  city: null,
  company: null,
  country: null,
  postalCode: null,
  aboutMe: null,
};

export const getUserProfile = (accessToken) => {
  return async (dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Auth: "JWT  " + accessToken,
    };
    const response = await axios.get(`${SERVER_URL}/user/profile`, {
      headers,
    });
    dispatch(userActions.userData(response.data));
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData(state, action) {
      const data = action.payload;
      return {
        userName: data.userName,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
        aboutMe: data.aboutMe,
      };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
