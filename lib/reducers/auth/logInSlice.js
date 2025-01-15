import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const API_BASE_URL1 = process.env.NEXT_PUBLIC_API_BASE_URL;

export const logInAction = createAsyncThunk(
  "login/loginAction",
  async (form, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post(
        `${API_BASE_URL1}/account/login`,
        {
          UserName: form.form.UserName,
          Password: form.form.Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      const token1 = sessionStorage.getItem("token");
      if (!refreshToken) {
        throw new Error("No refresh token found.");
      }
      // Make the API call to refresh the token using the refresh token
      const response = await axios.post(
        `${API_BASE_URL1}/account/RefreshToken`,
        { RefreshToken: refreshToken, Token: token1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const { token, newRefreshToken } = response.data;

      // Save the new session token and refresh token
      sessionStorage.setItem("token", token); // Update session token
      localStorage.setItem("refreshToken", newRefreshToken); // Update refresh token

      return { token, refreshToken: newRefreshToken };
    } catch (error) {
      // Handle any errors and clear invalid tokens
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
