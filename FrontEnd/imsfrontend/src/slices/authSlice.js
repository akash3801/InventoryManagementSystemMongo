import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("authToken") || null,
  username: sessionStorage.getItem("username") || null,
  role: sessionStorage.getItem("role") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.role = null;
      sessionStorage.clear(); // Clear session storage on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
