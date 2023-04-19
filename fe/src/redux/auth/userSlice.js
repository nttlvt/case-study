import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
export const signup = createAsyncThunk("user/signup", async (payload) => {
  const response = await userApi.signup(payload);
  return response.data.user;
});
export const login = createAsyncThunk("user/login", async (payload) => {
  const response = await userApi.login(payload);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data.user;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    isLoading: false,
    error: null,
    isAuthen: Boolean(localStorage.getItem("user")),
  },
  reducers: {
    logout(state) {
      state.isAuthen = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
      state.error = null;
      state.isAuthen = true;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
