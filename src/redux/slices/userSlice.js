import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    registrationStart: (state, action) => {
      (state.isLoading = true), (state.error = null);

      Cookies.set("registrationData", JSON.stringify(action.payload));
    },
    registrationSuccess: (state, action) => {
      state.isLoading = false;
    },
    registrationFailure: (state, acion) => {
      (state.isLoading = false), (state.error = action.payload);
    },
  },
});

export const { registrationStart, registrationSuccess, registrationFailure } =
  registerSlice.actions;
export default registerSlice.reducer;
