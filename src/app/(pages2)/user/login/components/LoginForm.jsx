"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../../../../../lib/hooks";
import { logInAction } from "../../../../../../lib/reducers/auth/logInSlice";
import { decodeToken } from "../../../../../../lib/reducers/user/userSlice";

const LoginForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const showPass = () => setShow(!show);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.login);

  const onSubmit = async (data) => {
    const form = {
      UserName: data.userName,
      Password: data.password,
    };
    const result = await dispatch(logInAction({ form }));

    if (logInAction.fulfilled.match(result)) {
      const token = result.payload;
      dispatch(decodeToken(token));
      router.push("/");
    }
  };

  useEffect(() => {
    if (error) {
      setError("root", { message: error?.message });
    }
  }, [error]);

  return (
    <div
      className={`${
        pathname == "/user/login" ? "opacity-100" : "opacity-0"
      } transition-all duration-300 ease-in-out p-8`}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("userName", { required: "Username is required" })}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 pr-12"
              type={show ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={showPass}
              className="absolute right-3 top-11 text-[1.2rem] text-gray-400 hover:text-primary"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgotpassword"
            className="text-sm text-primary hover:text-primary-100"
          >
            Forgot Password?
          </Link>
        </div>

        {errors.root && (
          <p className="text-red-500 text-sm text-center">
            {errors.root.message}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className={`w-full bg-primary hover:bg-primary-100 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
            isSubmitting && "cursor-not-allowed"
          }`}
          type="submit"
        >
          {isSubmitting ? (
            <>
              Logging In
              <PuffLoader color="white" size={20} />
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
