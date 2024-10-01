"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "../../../../../lib/hooks";
import { MoonLoader } from "react-spinners";

const UserLogMenuCS = () => {
  const { userInfo, tokenChecking } = useAppSelector((state) => state.user);

  return (
    <>
      {tokenChecking ? (
        <MoonLoader color="#20B486" size={15} />
      ) : userInfo ? (
        <div>welcome {userInfo.name}</div>
      ) : (
        <>
          <Link
            className="rounded-md text-sm bg-gray-100 px-3 py-2 font-semibold text-primary transition hover:text-hoverPrimary"
            href="/registration/login"
          >
            Login
          </Link>
          <Link
            className="block rounded-md text-base bg-primary px-3 py-2 font-semibold text-white transition hover:bg-hoverPrimary"
            href="/registration/signup"
          >
            Create free account
          </Link>
        </>
      )}
    </>
  );
};

export default UserLogMenuCS;
