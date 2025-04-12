import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    tokenChecking: true,
  },
  reducers: {
    decodeToken: (state, action) => {
      const token = action.payload;

      try {
        // Decode the JWT to get the payload
        const decodedToken = jwtDecode(token);

        const userInfo = {
          audience: decodedToken.aud,
          expiration: decodedToken.exp, // e.g., 1727784848
          role: decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ], // e.g., "admin"
          name: decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ], // e.g., "admin"
          nameIdentifier:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          issuer: decodedToken.iss,
          jti: decodedToken.jti,
          ProfilePicturePath: decodedToken.ProfilePicturePath
        };

        state.userInfo = userInfo;
      } catch (error) {
        console.error("Error decoding token:", error);
        state.userInfo = null; // Reset userInfo on error
      }
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
    endTokenChecking: (state) => {
      state.tokenChecking = false;
    },
  },
});

export const { decodeToken, clearUserInfo, endTokenChecking } =
  userSlice.actions;

export default userSlice.reducer;
