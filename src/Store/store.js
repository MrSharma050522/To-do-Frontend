import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice";

const store = configureStore({
  reducer: authReducer,
});

export default store;
