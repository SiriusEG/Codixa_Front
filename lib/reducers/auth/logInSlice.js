import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const API_BASE_URL1 = process.env.API_BASE_URL;

export const logInAction = createAsyncThunk(
  "login/loginAction",
  async (form, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post("/api/auth/login", {
        UserName: form.form.UserName,
        Password: form.form.Password,
      });

      const { token, refreshToken } = response.data;

      // Save tokens
      sessionStorage.setItem("token", token); // Active session token
      localStorage.setItem("refreshToken", refreshToken); // Long-term refresh token

      return { token, refreshToken };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const refreshTokenAction = createAsyncThunk(
  "login/refreshTokenAction",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const token = sessionStorage.getItem("token");

      if (!refreshToken) {
        throw new Error("No refresh token found.");
      }

      // Use the Next.js API route to refresh the token
      const response = await axios.post("/api/auth/refreshToken", {
        refreshToken,
        token,
      });

      const { token: newToken, refreshToken: newRefreshToken } = response.data;

      // Save the new tokens
      sessionStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      // Handle errors and clear invalid tokens
      sessionStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      return rejectWithValue({
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
      });
    }
  }
);

const logInSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      sessionStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(logInAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshTokenAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logInSlice.reducer;
export const { logout } = logInSlice.actions;
