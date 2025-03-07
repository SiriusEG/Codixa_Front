"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { refreshTokenAction } from "../../../lib/reducers/auth/logInSlice";

const TokenRefreshHandler = () => {
  const dispatch = useAppDispatch();
  const { tokenChecking, userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Check if the session token is removed and we need to refresh it
    if (!localStorage.getItem("token") && !tokenChecking && !userInfo) {
      dispatch(refreshTokenAction()); // Trigger the refresh token action
    }
  }, [dispatch, userInfo, tokenChecking]);

  return null; // This component doesn't need to render anything
};

export default TokenRefreshHandler;
