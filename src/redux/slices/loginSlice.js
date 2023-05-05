import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const registrationData = JSON.parse(Cookies.get("registrationData") || "{}");

const initialState = {
  isLoading: false,
  error: null,
  isAuth:false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.isLoading = true;
      state.error = null;
      const { email, password } = action.payload;

      if (
        email === registrationData.email &&
        password === registrationData.password
      ) {
        Cookies.set("loginData", action.payload);
        state.isLoading = false;
        state.isAuth=true;
      } else {
        state.isLoading = false;
        state.error = "Invalid email or password";
        state.isAuth=false;
      }
    },
    loginSuccess: (state) => {
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isAuth = false;

      Cookies.remove("loginData");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  loginSlice.actions;

export default loginSlice.reducer;
