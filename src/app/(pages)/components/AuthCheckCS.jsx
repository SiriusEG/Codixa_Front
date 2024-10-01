"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import { decodeToken } from "../../../../lib/reducers/user/userSlice";
import { logout } from "../../../../lib/reducers/auth/logInSlice";

const AuthCheckCS = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      try {
        dispatch(decodeToken(token));
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }
  }, [dispatch]);
  return <></>;
};

export default AuthCheckCS;
