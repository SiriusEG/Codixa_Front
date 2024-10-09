"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../../../../../../lib/hooks";
import { logInAction } from "../../../../../../../lib/reducers/auth/logInSlice";
import { decodeToken } from "../../../../../../../lib/reducers/user/userSlice";

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
    const form = JSON.stringify({
      userName: data.userName,
      password: data.password,
    });

    const result = await dispatch(
      logInAction({ remmberMe: data.remmberMe, form })
    );

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
        pathname == "/registration/login" ? "opacity-100 " : "opacity-0 "
      } transition-all duration-300 ease-in-out`}
    >
      <form
        className="rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label
            className="block font-semibold text-black text-sm mb-3"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            {...register("userName", { required: "userName is required" })}
          />
        </div>
        {errors.userName && (
          <p className="text-red-500  justify-center">
            {errors.userName.message}
          </p>
        )}
        <div className="mb-3 relative">
          <label
            className="block font-semibold text-black text-sm mb-3"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: "password is required" })}
            className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
            id="password"
            type={show ? "text" : "password"}
            placeholder="Password"
          />
          {show ? (
            <FaEye
              className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
              onClick={showPass}
            />
          ) : (
            <FaEyeSlash
              className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
              onClick={showPass}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500 my-2">{errors.password.message}</span>
        )}
        <div className="flex justify-between mt-[-5%] mb-7">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              name="Remember"
              id="remember"
              {...register("remmberMe")}
            />
            <label
              className="text-gray-600 text-[.8rem] hover:text-gray-900"
              htmlFor="remember"
            >
              Remember me!
            </label>
          </div>
          <Link href="/forgetpassword" className="text-[.8rem] text-cyan-600">
            Forget Password?
          </Link>
        </div>
        {errors.root && (
          <span className="text-red-500">{errors.root.message}</span>
        )}
        <div className="flex justify-center">
          <button
            disabled={isSubmitting}
            className={`bg-primary w-[150px] text-white font-semibold py-2 px-5 rounded-3xl outline-none focus:shadow-outline flex gap-2 items-center justify-center ${
              isSubmitting && "bg-primary-100 cursor-not-allowed"
            }`}
            type="submit"
          >
            {isSubmitting ? "loggingIn " : "Login"}{" "}
            {isSubmitting && <PuffLoader color="white" size={15} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
