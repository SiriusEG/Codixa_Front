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
      if (token) {
        // Decode the JWT to get the payload
        const decodedToken = jwtDecode(token);

        const userInfo = {
          audience: decodedToken.aud, // "https://team-protifolio-vsdj.vercel.app"
          expiration: decodedToken.exp, // 1727784848 (you can convert it to a human-readable date)
          role: decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ], // "admin"
          name: decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ], // "admin"
          nameIdentifier:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ], // "0f33361d-5cbb-4b16-a44a-acd711395b2e"
          issuer: decodedToken.iss, // "https://sirius.runasp.net"
          jti: decodedToken.jti, // "7a1363b0-0b1f-4e62-9b51-9dd02d83d16f"
        };
        state.userInfo = userInfo;
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
