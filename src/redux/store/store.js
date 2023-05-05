import { configureStore } from "@reduxjs/toolkit";
import userRegister from "../slices/userSlice";
import userLogin from "../slices/loginSlice";

const store = configureStore({
  reducer: {
    registration: userRegister,
    login: userLogin,
  },
});

export default store;
