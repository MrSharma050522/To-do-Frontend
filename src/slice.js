import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username") || null,
  email: null,
  token: localStorage.getItem("token") || null,
};

const store = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setName(state, action) {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { saveToken, setName, setEmail } = store.actions;
export default store.reducer;
