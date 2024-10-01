import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

export const logInAction = createAsyncThunk(
  "login/loginAction",
  async ({ form, remmberMe }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const data = await axios.post(
        "https://codixa.runasp.net/api/account/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;

      if (remmberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      return token;
    } catch (error) {
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
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
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
        state.token = action.payload;
      })
      .addCase(logInAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logInSlice.reducer;
export const { logout } = logInSlice.actions;
