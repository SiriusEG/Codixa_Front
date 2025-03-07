"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../../../../../lib/hooks";
import {
  decodeToken,
  endTokenChecking,
} from "../../../../../lib/reducers/user/userSlice";

const AuthCheckCS = () => {
  const dispatch = useAppDispatch();

  const checkToken = async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      try {
        dispatch(decodeToken(token));
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        localStorage.removeItem("token");
      }
    }

    dispatch(endTokenChecking());
  };

  useEffect(() => {
    checkToken();
  }, [dispatch]);
  return <></>;
};

export default AuthCheckCS;
