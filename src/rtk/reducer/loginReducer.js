import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
});

export const { toggleLogin } = loginSlice.actions;

export default loginSlice.reducer;
