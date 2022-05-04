import { createSlice } from "@reduxjs/toolkit";
import { register, getInfor } from "../action/user";

const initialState = {
  pending: false,
  error: false,
  success: false,
  isLogged: false,
  isAdmin: false,
  userInfor: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      if (action.payload == 1) {
        state.isAdmin = true;
      }
    },
    getProfile: (state) => {
      let res = localStorage.getItem("user");
      if (res) state.userInfor = JSON.parse(res).user;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.success = false;
    },
    [register.fulfilled]: (state) => {
      state.pending = false;
      state.success = true;
    },
    [register.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
  extraReducers: {
    [getInfor.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.success = false;
    },
    [getInfor.fulfilled]: (state, action) => {
      state.pending = false;
      state.success = true;
      state.userInfor = action.payload;
    },
    [getInfor.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { updateStart, updateSuccess, updateFailure, login, getProfile } =
  userSlice.actions;
export default userSlice.reducer;
